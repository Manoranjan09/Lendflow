from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.settings import LenderSettings

from app.schemas.settings import (
    SettingsUpdate
)

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.get("/{lender_id}")
def get_settings(
    lender_id: int,
    db: Session = Depends(get_db)
):
    settings = (
        db.query(LenderSettings)
        .filter(
            LenderSettings.lender_id == lender_id
        )
        .first()
    )

    if not settings:
        settings = LenderSettings(
            lender_id=lender_id
        )

        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


@router.put("/{lender_id}")
def update_settings(
    lender_id: int,
    payload: SettingsUpdate,
    db: Session = Depends(get_db)
):
    settings = (
        db.query(LenderSettings)
        .filter(
            LenderSettings.lender_id == lender_id
        )
        .first()
    )

    if not settings:
        settings = LenderSettings(
            lender_id=lender_id
        )

        db.add(settings)

    settings.business_name = payload.business_name
    settings.currency = payload.currency
    settings.default_interest_rate = payload.default_interest_rate
    settings.default_tenure = payload.default_tenure
    settings.penalty_per_day = payload.penalty_per_day

    settings.email_reminders = payload.email_reminders
    settings.sms_alerts = payload.sms_alerts
    settings.whatsapp_messages = payload.whatsapp_messages
    settings.ai_weekly_digest = payload.ai_weekly_digest

    db.commit()
    db.refresh(settings)

    return settings