from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Boolean,
    Date,
    ForeignKey,
    DateTime
)

from sqlalchemy.sql import func
from app.db.database import Base

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True)
    lender_id = Column(
    Integer,
    ForeignKey("users.id")
)
    borrower_id = Column(
        Integer,
        ForeignKey("borrowers.id")
    )

    principal_amount = Column(Float)

    interest_rate = Column(Float)

    interest_type = Column(String)

    is_compound = Column(
        Boolean,
        default=False
    )

    issue_date = Column(Date)

    due_date = Column(Date)

    status = Column(
        String,
        default="ACTIVE"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )