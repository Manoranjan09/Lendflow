from pydantic import BaseModel
from datetime import date

class RepaymentCreate(BaseModel):
    loan_id: int
    amount_paid: float
    payment_date: date
    payment_method: str
    notes: str | None = None
    