from pydantic import BaseModel

class BorrowerCreate(BaseModel):
    lender_id: int
    name: str
    phone: str
    address: str
    aadhaar: str


class BorrowerResponse(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    aadhaar: str
    status: str

    class Config:
        from_attributes = True