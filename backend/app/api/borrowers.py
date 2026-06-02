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
    lender_id=data.lender_id,
    name=data.name,
    phone=data.phone,
    address=data.address,
    aadhaar=data.aadhaar
)

    db.add(borrower)
    db.commit()
    db.refresh(borrower)

    return borrower


@router.get("/{lender_id}")
def get_borrowers(
    lender_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Borrower)
        .filter(
            Borrower.lender_id == lender_id
        )
        .all()
    )

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
@router.put("/{borrower_id}")
def update_borrower(
    borrower_id: int,
    data: BorrowerCreate,
    db: Session = Depends(get_db)
):
    borrower = (
        db.query(Borrower)
        .filter(Borrower.id == borrower_id)
        .first()
    )

    if not borrower:
        return {"error": "Borrower not found"}

    borrower.name = data.name
    borrower.phone = data.phone
    borrower.address = data.address
    borrower.aadhaar = data.aadhaar

    db.commit()
    db.refresh(borrower)

    return borrower