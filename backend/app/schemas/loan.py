from pydantic import BaseModel
from datetime import date

class LoanCreate(BaseModel):
    borrower_id: int
    principal_amount: float
    interest_rate: float
    interest_type: str
    is_compound: bool
    issue_date: date
    due_date: date
    lender_id: int