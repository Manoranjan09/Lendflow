from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.borrowers import router as borrower_router
from app.api.loans import router as loan_router
from app.api.repayments import router as repayment_router
from app.api.dashboard import router as dashboard_router
from app.api.dashboard import router as dashboard_router
app = FastAPI(
    title="LendFlow AI"
)

app.include_router(auth_router)
app.include_router(borrower_router)
app.include_router(loan_router)
app.include_router(repayment_router)
app.include_router(dashboard_router)
app.include_router(dashboard_router)
@app.get("/")
def root():
    return {
        "message": "Backend Running"
    }