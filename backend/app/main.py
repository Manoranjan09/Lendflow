from fastapi import FastAPI
from app.api.assistant import router as assistant_router
from app.api.auth import router as auth_router
from app.api.borrowers import router as borrower_router
from app.api.loans import router as loan_router
from app.api.repayments import router as repayment_router
from app.api.dashboard import router as dashboard_router
from app.api import users
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="LendFlow AI"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(borrower_router)
app.include_router(loan_router)
app.include_router(repayment_router)
app.include_router(dashboard_router)
app.include_router(assistant_router)
app.include_router(users.router)
@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }