from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.db.database import Base

class Borrower(Base):
    __tablename__ = "borrowers"

    id = Column(Integer, primary_key=True, index=True)

    lender_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    name = Column(String, nullable=False)

    phone = Column(String)

    address = Column(String)

    aadhaar = Column(String)

    status = Column(
        String,
        default="ACTIVE"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )