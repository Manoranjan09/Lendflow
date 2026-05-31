from datetime import date

def get_loan_status(
    outstanding: float,
    due_date
):
    today = date.today()

    if outstanding <= 0:
        return "PAID"

    if due_date < today:
        return "OVERDUE"

    return "ACTIVE"