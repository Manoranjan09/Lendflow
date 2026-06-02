from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.loan import Loan
from app.models.repayment import Repayment
from app.schemas.loan import LoanCreate
from datetime import date
from app.services.loan_calculator import (
    calculate_simple_interest,
    calculate_compound_interest
)

from app.services.loan_status import get_loan_status

router = APIRouter(
    prefix="/loans",
    tags=["Loans"]
)


@router.post("/")
def create_loan(
    data: LoanCreate,
    db: Session = Depends(get_db)
):
    loan = Loan(
        lender_id=data.lender_id,
        borrower_id=data.borrower_id,
        principal_amount=data.principal_amount,
        interest_rate=data.interest_rate,
        interest_type=data.interest_type,
        is_compound=data.is_compound,
        issue_date=data.issue_date,
        due_date=data.due_date
    )

    db.add(loan)
    db.commit()
    db.refresh(loan)

    return loan

@router.get("/")
def get_loans(
    lender_id: int,
    db: Session = Depends(get_db)
):
    loans = (
        db.query(Loan)
        .filter(
            Loan.lender_id == lender_id
        )
        .all()
    )

    return loans
@router.get("/{loan_id}/summary")
def loan_summary(
    loan_id: int,
    db: Session = Depends(get_db)
):
    loan = (
        db.query(Loan)
        .filter(Loan.id == loan_id)
        .first()
    )

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

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

    total_paid = sum(
        repayment.amount_paid
        for repayment in repayments
    )

    outstanding = (
        result["total_due"]
        - total_paid
    )

    status = get_loan_status(
        outstanding,
        loan.due_date
    )

    return {
        "loan_id": loan.id,
        "principal": loan.principal_amount,
        "interest": result["interest"],
        "total_due": result["total_due"],
        "paid": total_paid,
        "outstanding": outstanding,
        "status": status
    }


@router.get("/{loan_id}")
def get_single_loan(
    loan_id: int,
    db: Session = Depends(get_db)
):
    loan = (
        db.query(Loan)
        .filter(Loan.id == loan_id)
        .first()
    )

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    return loan
@router.put("/{loan_id}")
def update_loan(
    loan_id: int,
    data: LoanCreate,
    db: Session = Depends(get_db)
):
    loan = (
        db.query(Loan)
        .filter(Loan.id == loan_id)
        .first()
    )

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    loan.borrower_id = data.borrower_id
    loan.principal_amount = data.principal_amount
    loan.interest_rate = data.interest_rate
    loan.interest_type = data.interest_type
    loan.is_compound = data.is_compound
    loan.issue_date = data.issue_date
    loan.due_date = data.due_date

    db.commit()
    db.refresh(loan)

    return loan

@router.delete("/{loan_id}")
def delete_loan(
    loan_id: int,
    db: Session = Depends(get_db)
):
    loan = (
        db.query(Loan)
        .filter(Loan.id == loan_id)
        .first()
    )

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    db.delete(loan)
    db.commit()

    return {
        "message": "Loan deleted successfully"
    }