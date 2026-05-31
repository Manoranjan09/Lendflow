from pydantic import BaseModel

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: str
    password: str