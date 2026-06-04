from pydantic import BaseModel

class SettingsUpdate(BaseModel):
    business_name: str
    currency: str
    default_interest_rate: float
    default_tenure: int
    penalty_per_day: float

    email_reminders: bool
    sms_alerts: bool
    whatsapp_messages: bool
    ai_weekly_digest: bool


class SettingsResponse(SettingsUpdate):
    lender_id: int

    class Config:
        from_attributes = True