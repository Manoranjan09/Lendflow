from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.database import get_db
from app.models.borrower import Borrower
from app.models.loan import Loan
from app.models.repayment import Repayment

from app.services.ai_service import ask_ai

router = APIRouter(
    prefix="/assistant",
    tags=["Assistant"]
)


class ChatRequest(BaseModel):
    message: str
    lender_id: int


@router.post("/chat")
def assistant_chat(
    data: ChatRequest,
    db: Session = Depends(get_db)
):
    borrowers = (
    db.query(Borrower)
    .filter(
        Borrower.lender_id ==
        data.lender_id
    )
    .all()
)
    loans = (
    db.query(Loan)
    .filter(
        Loan.lender_id ==
        data.lender_id
    )
    .all()
)
    repayments = (
    db.query(Repayment)
    .filter(
        Repayment.lender_id ==
        data.lender_id
    )
    .all()
)

    # =========================
    # Portfolio Metrics
    # =========================

    total_borrowers = len(borrowers)

    total_loans = len(loans)

    total_principal = sum(
        loan.principal_amount
        for loan in loans
    )

    total_collected = sum(
        repayment.amount_paid
        for repayment in repayments
    )

    outstanding_balance = (
        total_principal - total_collected
    )

    # =========================
    # Fast Direct Answers
    # =========================

    question = data.message.lower()

    if (
        "how many" in question
        and "borrower" in question
    ):
        return {
            "answer":
            f"You currently have {total_borrowers} borrowers."
        }

    if (
        "how many" in question
        and "loan" in question
    ):
        return {
            "answer":
            f"You currently have {total_loans} loans."
        }

    if "outstanding" in question:
        return {
            "answer":
            f"Outstanding balance is ₹{outstanding_balance:,.0f}."
        }

    if (
        "collected" in question
        or "repayment" in question
    ):
        return {
            "answer":
            f"Total collected amount is ₹{total_collected:,.0f}."
        }

    if (
        "lent" in question
        or "principal" in question
    ):
        return {
            "answer":
            f"Total amount lent is ₹{total_principal:,.0f}."
        }

    # =========================
    # Context For Groq
    # =========================
    borrower_map = {
    borrower.id: borrower.name
    for borrower in borrowers
}
    context = f"""
BORROWERS:
{[
    {
        "id": b.id,
        "name": b.name
    }
    for b in borrowers
]}

LOANS:
{[
    {
        "id": l.id,

        "borrower_name": next(
            (
                b.name
                for b in borrowers
                if b.id == l.borrower_id
            ),
            "Unknown"
        ),

        "principal": l.principal_amount,

        "interest_rate": l.interest_rate,

        "interest_type": l.interest_type,

        "issue_date": str(l.issue_date),

        "due_date": str(l.due_date),

        "status": l.status
    }
    for l in loans
]}

REPAYMENTS:
{[
    {
        "loan_id": r.loan_id,
        "amount": r.amount_paid
    }
    for r in repayments
]}

PORTFOLIO SUMMARY (ALL VALUES IN INR ₹):
{{
    "total_borrowers": {total_borrowers},
    "total_loans": {total_loans},
    "total_principal": {total_principal},
    "total_collected": {total_collected},
    "outstanding_balance": {outstanding_balance}
}}
"""

    prompt = f"""
You are CreditFlow AI.

Use ONLY the portfolio data provided.

Portfolio Data:

{context}

User Question:

{data.message}
"""

    answer = ask_ai(prompt)

    return {
        "answer": answer
    }