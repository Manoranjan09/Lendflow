from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi.responses import FileResponse
import os
import shutil

from app.models.document import Document
from app.db.database import get_db
from app.models.borrower import Borrower
from app.schemas.borrower import BorrowerCreate
from fastapi import HTTPException
from app.models.loan import Loan
from app.models.loan import Loan
from app.models.repayment import Repayment
from fastapi.responses import FileResponse
from datetime import date
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import tempfile
from app.services.loan_calculator import (
    calculate_simple_interest,
    calculate_compound_interest
)
router = APIRouter(
    prefix="/borrowers",
    tags=["Borrowers"]
)


@router.post("/")
def create_borrower(
    data: BorrowerCreate,
    db: Session = Depends(get_db)
):
    borrower = Borrower(
    lender_id=data.lender_id,
    name=data.name,
    phone=data.phone,
    address=data.address,
    aadhaar=data.aadhaar
)

    db.add(borrower)
    db.commit()
    db.refresh(borrower)

    return borrower


@router.get("/{lender_id}")
def get_borrowers(
    lender_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Borrower)
        .filter(
            Borrower.lender_id == lender_id
        )
        .all()
    )

@router.delete("/{borrower_id}")
def delete_borrower(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(
            Borrower.id == borrower_id
        )
        .first()
    )

    if not borrower:
        raise HTTPException(
            status_code=404,
            detail="Borrower not found"
        )

    active_loans = (
        db.query(Loan)
        .filter(
            Loan.borrower_id == borrower_id
        )
        .count()
    )

    if active_loans > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete borrower with existing loans"
        )

    db.delete(borrower)
    db.commit()

    return {
        "message": "Borrower deleted successfully"
    }
@router.put("/{borrower_id}")
def update_borrower(
    borrower_id: int,
    data: BorrowerCreate,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(Borrower.id == borrower_id)
        .first()
    )

    if not borrower:
        return {"error": "Borrower not found"}

    borrower.name = data.name
    borrower.phone = data.phone
    borrower.address = data.address
    borrower.aadhaar = data.aadhaar

    db.commit()
    db.refresh(borrower)

    return borrower
@router.get("/{borrower_id}/profile")
def get_borrower_profile(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(Borrower.id == borrower_id)
        .first()
    )

    if not borrower:
        raise HTTPException(
            status_code=404,
            detail="Borrower not found"
        )

    loans = (
        db.query(Loan)
        .filter(
            Loan.borrower_id == borrower_id
        )
        .all()
    )

    total_borrowed = 0
    total_paid = 0
    outstanding = 0

    loan_list = []

    for loan in loans:

        months = (
            (loan.due_date.year - loan.issue_date.year) * 12
            +
            (loan.due_date.month - loan.issue_date.month)
        )

        if loan.is_compound:
            result = calculate_compound_interest(
                loan.principal_amount,
                loan.interest_rate,
                months
            )
        else:
            result = calculate_simple_interest(
                loan.principal_amount,
                loan.interest_rate,
                months
            )

        repayments = (
            db.query(Repayment)
            .filter(
                Repayment.loan_id == loan.id
            )
            .all()
        )

        paid = sum(
            r.amount_paid
            for r in repayments
        )

        loan_outstanding = (
            result["total_due"]
            - paid
        )

        total_borrowed += loan.principal_amount
        total_paid += paid
        outstanding += loan_outstanding

        loan_list.append({
            "id": loan.id,
            "principal": loan.principal_amount,
            "outstanding": loan_outstanding,
            "due_date": loan.due_date
        })

    all_repayments = (
        db.query(Repayment)
        .join(
            Loan,
            Repayment.loan_id == Loan.id
        )
        .filter(
            Loan.borrower_id == borrower_id
        )
        .all()
    )

    return {
        "borrower": borrower,

        "total_loans": len(loans),

        "total_borrowed": total_borrowed,

        "outstanding": outstanding,

        "total_paid": total_paid,

        "loans": loan_list,

        "repayments": all_repayments
    }
@router.get("/{borrower_id}/statement")
def download_statement(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(
            Borrower.id == borrower_id
        )
        .first()
    )

    if not borrower:
        raise HTTPException(
            status_code=404,
            detail="Borrower not found"
        )

    profile = get_borrower_profile(
        borrower_id,
        db
    )

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    doc = SimpleDocTemplate(
        temp_file.name
    )

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "CreditFlow AI",
            styles["Title"]
        )
    )

    content.append(
        Paragraph(
            "Borrower Statement",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 12)
    )

    content.append(
        Paragraph(
            f"Name: {borrower.name}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Phone: {borrower.phone}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Address: {borrower.address}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            f"Total Loans: {profile['total_loans']}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Total Borrowed: ₹{profile['total_borrowed']}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Total Paid: ₹{profile['total_paid']}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Outstanding: ₹{profile['outstanding']}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Loans",
            styles["Heading3"]
        )
    )

    for loan in profile["loans"]:

        content.append(
            Paragraph(
                f"Loan #{loan['id']} | Principal ₹{loan['principal']} | Outstanding ₹{loan['outstanding']}",
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Repayments",
            styles["Heading3"]
        )
    )

    for repayment in profile["repayments"]:

        content.append(
            Paragraph(
                f"{repayment.payment_date} | ₹{repayment.amount_paid}",
                styles["BodyText"]
            )
        )

    doc.build(content)

    return FileResponse(
        temp_file.name,
        media_type="application/pdf",
        filename=f"{borrower.name}_statement.pdf"
    )
@router.get("/{borrower_id}/risk")
def borrower_risk_score(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    profile = get_borrower_profile(
        borrower_id,
        db
    )

    score = 100
    reasons = []

    # Outstanding amount

    if profile["outstanding"] > 500000:
        score -= 30

        reasons.append(
            "High outstanding balance"
        )

    elif profile["outstanding"] > 200000:
        score -= 15

        reasons.append(
            "Moderate outstanding balance"
        )

    # Overdue loans

    today = date.today()

    overdue_count = 0

    for loan in profile["loans"]:

        if loan["due_date"] < today:
            overdue_count += 1

    if overdue_count > 0:

        score -= overdue_count * 20

        reasons.append(
            f"{overdue_count} overdue loan(s)"
        )

    # Repayment history

    repayment_count = len(
        profile["repayments"]
    )

    if repayment_count == 0:

        score -= 20

        reasons.append(
            "No repayments made"
        )

    elif repayment_count >= 3:

        score += 10

        reasons.append(
            "Good repayment history"
        )

    score = max(
        min(score, 100),
        0
    )

    if score >= 80:
        risk = "LOW"

    elif score >= 50:
        risk = "MEDIUM"

    else:
        risk = "HIGH"

    # AI Suggestions

    suggestions = []

    if overdue_count > 0:
        suggestions.append(
            "Send WhatsApp reminder today"
        )

    if profile["outstanding"] > 100000:
        suggestions.append(
            "Offer partial repayment plan"
        )

    if score < 40:
        suggestions.append(
            "High default risk, contact borrower immediately"
        )

    if risk == "MEDIUM":
        suggestions.append(
            "Follow up within 7 days"
        )

    if risk == "LOW":
        suggestions.append(
            "Continue regular monitoring"
        )

    return {
        "score": score,
        "risk": risk,
        "reasons": reasons,
        "suggestions": suggestions
    }
@router.post("/{borrower_id}/documents")
def upload_document(
    borrower_id: int,
    document_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(
            Borrower.id == borrower_id
        )
        .first()
    )

    if not borrower:
        raise HTTPException(
            status_code=404,
            detail="Borrower not found"
        )

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    file_path = (
        f"uploads/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = Document(
        borrower_id=borrower_id,
        file_name=file.filename,
        file_path=file_path,
        document_type=document_type
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "message": "Document uploaded",
        "document_id": document.id
    }
@router.get("/{borrower_id}/documents")
def get_documents(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    documents = (
        db.query(Document)
        .filter(
            Document.borrower_id == borrower_id
        )
        .all()
    )

    return documents
@router.get("/documents/{document_id}")
def view_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return FileResponse(
        document.file_path
    )
@router.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if os.path.exists(
        document.file_path
    ):
        os.remove(
            document.file_path
        )

    db.delete(document)

    db.commit()

    return {
        "message": "Document deleted"
    }