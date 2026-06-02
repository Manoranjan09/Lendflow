from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/google-login")
def google_login(
    data: dict,
    db: Session = Depends(get_db)
):
    email = data.get("email")
    name = data.get("name")

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        user = User(
            name=name,
            email=email,
            password_hash="GOOGLE_LOGIN",
            role="LENDER"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }