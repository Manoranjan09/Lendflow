from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.borrower import Borrower
from app.schemas.borrower import BorrowerCreate
from fastapi import HTTPException
from app.models.loan import Loan
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
        lender_id=1,  # temporary until auth is restored
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
    db: Session = Depends(get_db)
):
    return db.query(Borrower).all()

@router.delete("/{borrower_id}")
def delete_borrower(
    borrower_id: int,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(
            Borrower.id == borrower_id
        )
        .first()
    )

    if not borrower:
        raise HTTPException(
            status_code=404,
            detail="Borrower not found"
        )

    active_loans = (
        db.query(Loan)
        .filter(
            Loan.borrower_id == borrower_id
        )
        .count()
    )

    if active_loans > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete borrower with existing loans"
        )

    db.delete(borrower)
    db.commit()

    return {
        "message": "Borrower deleted successfully"
    }