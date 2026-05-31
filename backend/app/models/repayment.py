from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Date,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func
from app.db.database import Base

class Repayment(Base):
    __tablename__ = "repayments"

    id = Column(Integer, primary_key=True)

    loan_id = Column(
        Integer,
        ForeignKey("loans.id")
    )

    amount_paid = Column(Float)

    payment_date = Column(Date)

    payment_method = Column(String)

    notes = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )