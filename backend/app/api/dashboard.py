from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.borrower import Borrower
from app.models.loan import Loan
from app.models.repayment import Repayment
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def dashboard_stats(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]

    total_borrowers = (
        db.query(Borrower)
        .filter(Borrower.lender_id == user_id)
        .count()
    )

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