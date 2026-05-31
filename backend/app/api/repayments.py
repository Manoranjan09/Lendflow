from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.repayment import Repayment
from app.schemas.repayment import RepaymentCreate
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/repayments",
    tags=["Repayments"]
)

@router.post("/")
def create_repayment(
    data: RepaymentCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    repayment = Repayment(
        loan_id=data.loan_id,
        amount_paid=data.amount_paid,
        payment_date=data.payment_date,
        payment_method=data.payment_method,
        notes=data.notes
    )

    db.add(repayment)
    db.commit()
    db.refresh(repayment)

    return repayment

@router.get("/")
def get_repayments(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Repayment).all()
