from pydantic import BaseModel

class BorrowerCreate(BaseModel):
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