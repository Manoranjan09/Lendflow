from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from openpyxl import Workbook
from fastapi.responses import FileResponse
import tempfile
from app.db.database import get_db
from app.models.borrower import Borrower
from app.models.loan import Loan
from app.models.repayment import Repayment
from fastapi.responses import FileResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import tempfile
from datetime import date, timedelta, datetime


def calculate_expected_amount(
    principal,
    rate,
    issue_date,
    due_date,
    is_compound
):
    days = (due_date - issue_date).days

    years = days / 365

    if is_compound:

        amount = (
            principal *
            ((1 + rate / 100) ** years)
        )

    else:

        amount = (
            principal *
            (
                1 +
                (rate / 100 * years)
            )
        )

    return amount
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    lender_id: int,
    db: Session = Depends(get_db)
):
    total_borrowers = (
    db.query(Borrower)
    .filter(
        Borrower.lender_id == lender_id
    )
    .count()
)

    loans = (
    db.query(Loan)
    .filter(
        Loan.lender_id == lender_id
    )
    .all()
)

    total_loans = len(loans)

    total_lent = sum(
        loan.principal_amount
        for loan in loans
    )

    total_collected = (
        db.query(
            func.coalesce(
                func.sum(Repayment.amount_paid),
                0
            )
        ).scalar()
    )

    active_loans = sum(
        1 for loan in loans
        if loan.status == "ACTIVE"
    )

    overdue_loans = sum(
        1 for loan in loans
        if loan.status == "OVERDUE"
    )

    paid_loans = sum(
        1 for loan in loans
        if loan.status == "PAID"
    )

    outstanding_balance = (
        total_lent - total_collected
    )

    return {
        "total_borrowers": total_borrowers,
        "total_loans": total_loans,
        "active_loans": active_loans,
        "overdue_loans": overdue_loans,
        "paid_loans": paid_loans,
        "total_lent": total_lent,
        "total_collected": total_collected,
        "outstanding_balance": outstanding_balance
    }

@router.get("/insights")
def dashboard_insights(
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

    total_lent = sum(
        loan.principal_amount
        for loan in loans
    )

    total_collected = (
        db.query(
            func.coalesce(
                func.sum(
                    Repayment.amount_paid
                ),
                0
            )
        ).scalar()
    )

    overdue_loans = sum(
        1
        for loan in loans
        if loan.status == "OVERDUE"
    )

    return {
        "overdue_loans": overdue_loans,
        "total_lent": total_lent,
        "total_collected": total_collected,
        "outstanding": total_lent - total_collected
    }

@router.get("/recent-borrowers")
def recent_borrowers(
    lender_id: int,
    db: Session = Depends(get_db)
):
    borrowers = (
    db.query(Borrower)
    .filter(
        Borrower.lender_id == lender_id
    )
    .order_by(Borrower.id.desc())
    .limit(5)
    .all()
)

    result = []

    for borrower in borrowers:

        loan = (
            db.query(Loan)
            .filter(
                Loan.borrower_id == borrower.id
            )
            .order_by(Loan.id.desc())
            .first()
        )

        if loan:

            total_paid = (
                db.query(
                    func.coalesce(
                        func.sum(
                            Repayment.amount_paid
                        ),
                        0
                    )
                )
                .filter(
                    Repayment.loan_id == loan.id
                )
                .scalar()
            )

            due_amount = (
                loan.principal_amount -
                total_paid
            )

            result.append({
                "id": borrower.id,
                "name": borrower.name,
                "principal": loan.principal_amount,
                "due": max(due_amount, 0),
                "status": loan.status
            })

        else:

            result.append({
                "id": borrower.id,
                "name": borrower.name,
                "principal": 0,
                "due": 0,
                "status": "NO LOAN"
            })

    return result
@router.get("/weekly-repayments")
def weekly_repayments(
    db: Session = Depends(get_db)
):
    today = date.today()

    days = []

    for i in range(6, -1, -1):
        current_day = today - timedelta(days=i)

        total = (
            db.query(
                func.coalesce(
                    func.sum(
                        Repayment.amount_paid
                    ),
                    0
                )
            )
            .filter(
                Repayment.payment_date ==
                current_day
            )
            .scalar()
        )

        days.append({
            "d": current_day.strftime("%a"),
            "v": float(total)
        })

    return days
@router.get("/monthly-trend")
def monthly_trend(
    db: Session = Depends(get_db)
):
    months = [
        "Jan","Feb","Mar","Apr",
        "May","Jun","Jul","Aug",
        "Sep","Oct","Nov","Dec"
    ]

    current_year = datetime.now().year

    result = []

    for month_index in range(1, 13):

        loans = (
            db.query(Loan)
            .filter(
                func.extract(
                    "year",
                    Loan.issue_date
                ) == current_year,
                func.extract(
                    "month",
                    Loan.issue_date
                ) == month_index
            )
            .all()
        )

        lent = sum(
            loan.principal_amount
            for loan in loans
        )

        expected_interest = 0

        for loan in loans:

            total_amount = (
                calculate_expected_amount(
                    loan.principal_amount,
                    loan.interest_rate,
                    loan.issue_date,
                    loan.due_date,
                    loan.is_compound
                )
            )

            expected_interest += (
                total_amount -
                loan.principal_amount
            )

        result.append({
            "m": months[month_index - 1],
            "profit": round(
                expected_interest,
                2
            ),
            "lent": lent
        })

    return result
@router.get("/alerts")
def dashboard_alerts(
    lender_id: int,
    db: Session = Depends(get_db)
):
    today = date.today()

    loans = (
    db.query(Loan)
    .filter(
        Loan.lender_id == lender_id
    )
    .all()
)

    alerts = []

    for loan in loans:

        days_left = (
            loan.due_date - today
        ).days

        borrower = (
            db.query(Borrower)
            .filter(
                Borrower.id ==
                loan.borrower_id
            )
            .first()
        )

        if days_left < 0:

            alerts.append({
    "type": "OVERDUE",
    "borrower": borrower.name,
    "phone": borrower.phone,
    "days": abs(days_left),
    "message": f"{borrower.name} overdue by {abs(days_left)} day(s)"
})

        elif days_left <= 7:

            alerts.append({
    "type": "DUE_SOON",
    "borrower": borrower.name,
    "phone": borrower.phone,
    "days": days_left,
    "message": f"{borrower.name} due in {days_left} day(s)"
})

    return alerts

@router.get("/interest-recovery")
def analytics(
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
    
    repayments = db.query(Repayment).all()

    months = {
        "Jan": {"month": "Jan", "interest": 0, "recovered": 0},
        "Feb": {"month": "Feb", "interest": 0, "recovered": 0},
        "Mar": {"month": "Mar", "interest": 0, "recovered": 0},
        "Apr": {"month": "Apr", "interest": 0, "recovered": 0},
        "May": {"month": "May", "interest": 0, "recovered": 0},
        "Jun": {"month": "Jun", "interest": 0, "recovered": 0},
        "Jul": {"month": "Jul", "interest": 0, "recovered": 0},
        "Aug": {"month": "Aug", "interest": 0, "recovered": 0},
        "Sep": {"month": "Sep", "interest": 0, "recovered": 0},
        "Oct": {"month": "Oct", "interest": 0, "recovered": 0},
        "Nov": {"month": "Nov", "interest": 0, "recovered": 0},
        "Dec": {"month": "Dec", "interest": 0, "recovered": 0},
    }

    # Interest by loan issue month
    for loan in loans:

        if not loan.issue_date:
            continue

        month = loan.issue_date.strftime("%b")

        principal = loan.principal_amount or 0
        rate = loan.interest_rate or 0

        interest = (
            principal * rate / 100
        )

        months[month]["interest"] += interest

    # Recovery by repayment month
    for repayment in repayments:

        if not repayment.payment_date:
            continue

        month = repayment.payment_date.strftime("%b")

        months[month]["recovered"] += (
            repayment.amount_paid or 0
        )

    return list(months.values())
@router.get("/notifications")
def notifications(
    lender_id: int,
    db: Session = Depends(get_db)
):
    today = date.today()

    loans = (
    db.query(Loan)
    .filter(
        Loan.lender_id == lender_id
    )
    .all()
)

    result = []

    for loan in loans:

        borrower = (
            db.query(Borrower)
            .filter(
                Borrower.id == loan.borrower_id
            )
            .first()
        )

        days_left = (
            loan.due_date - today
        ).days

        if days_left < 0:
            result.append({
                "type": "OVERDUE",
                "message":
                f"{borrower.name} overdue by {abs(days_left)} day(s)"
            })

        elif days_left <= 7:
            result.append({
                "type": "DUE_SOON",
                "message":
                f"{borrower.name} due in {days_left} day(s)"
            })

    return result

@router.get("/landing-insight")
def landing_insight(
    db: Session = Depends(get_db)
):
    overdue = (
        db.query(Loan)
        .filter(
            Loan.status == "OVERDUE"
        )
        .first()
    )

    if overdue:

        borrower = (
            db.query(Borrower)
            .filter(
                Borrower.id ==
                overdue.borrower_id
            )
            .first()
        )

        return {
            "message":
            f"{borrower.name} is overdue. Suggested action: Send reminder."
        }

    return {
        "message":
        "Portfolio looks healthy. No overdue accounts."
    }
@router.get("/reminder/{borrower_name}")
def generate_reminder(
    borrower_name: str
):
    return {
        "message": f"""
Hello {borrower_name},

This is a reminder that your loan payment is overdue.

Kindly clear the outstanding amount at the earliest.

Thank you.
"""
    }
@router.get("/analytics")
def analytics_data(
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

    portfolio_status = [
        {
            "name": "ACTIVE",
            "value": sum(
                1 for loan in loans
                if loan.status == "ACTIVE"
            )
        },
        {
            "name": "OVERDUE",
            "value": sum(
                1 for loan in loans
                if loan.status == "OVERDUE"
            )
        },
        {
            "name": "PAID",
            "value": sum(
                1 for loan in loans
                if loan.status == "PAID"
            )
        }
    ]

    top_exposure = []

    for loan in loans:

        borrower = (
            db.query(Borrower)
            .filter(
                Borrower.id == loan.borrower_id
            )
            .first()
        )

        top_exposure.append({
            "borrower": borrower.name if borrower else "Unknown",
            "exposure": loan.principal_amount,
            "status": loan.status
        })

    top_exposure.sort(
        key=lambda x: x["exposure"],
        reverse=True
    )

    return {
        "portfolio_status": portfolio_status,
        "top_exposure": top_exposure[:5],
        "risky_accounts": top_exposure[:5]
    }
@router.get("/portfolio-report/{lender_id}")
def portfolio_report(
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

    borrowers = (
        db.query(Borrower)
        .filter(
            Borrower.lender_id == lender_id
        )
        .all()
    )

    total_loans = len(loans)

    total_lent = sum(
        loan.principal_amount
        for loan in loans
    )

    overdue_loans = sum(
        1
        for loan in loans
        if loan.due_date < date.today()
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
            "Portfolio Report",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 15)
    )

    content.append(
        Paragraph(
            f"Total Loans: {total_loans}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Total Borrowers: {len(borrowers)}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Total Lent: ₹{total_lent}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Overdue Loans: {overdue_loans}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Top Borrowers",
            styles["Heading3"]
        )
    )

    for borrower in borrowers:

        content.append(
            Paragraph(
                borrower.name,
                styles["BodyText"]
            )
        )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "AI Portfolio Summary",
            styles["Heading3"]
        )
    )

    if overdue_loans > 0:

        summary = (
            "Portfolio contains overdue loans. "
            "Follow-up recommended."
        )

    else:

        summary = (
            "Portfolio health is good."
        )

    content.append(
        Paragraph(
            summary,
            styles["BodyText"]
        )
    )

    doc.build(content)

    return FileResponse(
        temp_file.name,
        media_type="application/pdf",
        filename="portfolio_report.pdf"
    )
@router.get("/excel-report/{lender_id}")
def export_excel_report(
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

    wb = Workbook()
    ws = wb.active

    ws.title = "Loans"

    ws.append([
        "Loan ID",
        "Borrower ID",
        "Principal",
        "Interest Rate",
        "Issue Date",
        "Due Date"
    ])

    for loan in loans:

        ws.append([
            f"LN-{str(loan.id).zfill(4)}",
            loan.borrower_id,
            loan.principal_amount,
            loan.interest_rate,
            str(loan.issue_date),
            str(loan.due_date)
        ])

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".xlsx"
    )

    wb.save(temp_file.name)

    return FileResponse(
        temp_file.name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="loans_report.xlsx"
    )
@router.get("/public-stats/{lender_id}")
def public_stats(
    lender_id: int,
    db: Session = Depends(get_db)
):
    borrowers = (
        db.query(Borrower)
        .filter(
            Borrower.lender_id == lender_id
        )
        .count()
    )

    loans = (
        db.query(Loan)
        .filter(
            Loan.lender_id == lender_id
        )
        .all()
    )

    total_portfolio = sum(
        loan.principal_amount
        for loan in loans
    )

    total_recovered = (
        db.query(Repayment)
        .join(
            Loan,
            Repayment.loan_id == Loan.id
        )
        .filter(
            Loan.lender_id == lender_id
        )
        .all()
    )

    recovered_amount = sum(
        r.amount_paid
        for r in total_recovered
    )

    return {
        "borrowers": borrowers,
        "loans": len(loans),
        "portfolio": total_portfolio,
        "recovered": recovered_amount
    }