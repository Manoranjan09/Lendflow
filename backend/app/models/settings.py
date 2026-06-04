from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from app.db.database import Base

class LenderSettings(Base):
    __tablename__ = "lender_settings"

    id = Column(Integer, primary_key=True, index=True)

    lender_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    business_name = Column(String, default="")

    currency = Column(
        String,
        default="INR (₹)"
    )

    default_interest_rate = Column(
        Float,
        default=3
    )

    default_tenure = Column(
        Integer,
        default=12
    )

    penalty_per_day = Column(
        Float,
        default=0.1
    )

    email_reminders = Column(
        Boolean,
        default=True
    )

    sms_alerts = Column(
        Boolean,
        default=True
    )

    whatsapp_messages = Column(
        Boolean,
        default=True
    )

    ai_weekly_digest = Column(
        Boolean,
        default=True
    )