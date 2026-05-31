from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.borrower import Borrower
from app.schemas.borrower import BorrowerCreate

router = APIRouter(
    prefix="/borrowers",
    tags=["Borrowers"]
)

@router.post("/")
def create_borrower(
    data: BorrowerCreate,
    db: Session = Depends(get_db)
):
    borrower = Borrower(
        lender_id=1,  # temporary
        name=data.name,
        phone=data.phone,
        address=data.address,
        aadhaar=data.aadhaar
    )

    db.add(borrower)
    db.commit()
    db.refresh(borrower)

    return borrower
@router.get("/")
def get_borrowers(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return (
        db.query(Borrower)
        .filter(
            Borrower.lender_id ==
            current_user["user_id"]
        )
        .all()
    )
@router.post("/")
def create_borrower(
    data: BorrowerCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    borrower = Borrower(
        lender_id=current_user["user_id"],
        name=data.name,
        phone=data.phone,
        address=data.address,
        aadhaar=data.aadhaar
    )

    db.add(borrower)
    db.commit()
    db.refresh(borrower)

    return borrower
