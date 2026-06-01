from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.borrower import Borrower
from app.models.loan import Loan
from app.models.repayment import Repayment

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    total_borrowers = db.query(Borrower).count()

    loans = db.query(Loan).all()

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


@router.get("/analytics")
def analytics_data(
    db: Session = Depends(get_db)
):
    loans = db.query(Loan).all()

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
            "borrower": borrower.name if borrower else f"#{loan.borrower_id}",
            "exposure": loan.principal_amount,
            "status": loan.status
        })

    top_exposure.sort(
        key=lambda x: x["exposure"],
        reverse=True
    )

    risky_accounts = top_exposure[:5]

    return {
        "portfolio_status": portfolio_status,
        "top_exposure": top_exposure[:5],
        "risky_accounts": risky_accounts
    }