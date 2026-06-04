from app.db.database import engine, Base
from app.models.loan import Loan
from app.models.user import User
from app.models.borrower import Borrower
from app.models.repayment import Repayment
from app.models.settings import LenderSettings
from app.models.document import Document
Base.metadata.create_all(bind=engine)

print("Tables created successfully")