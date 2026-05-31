import math

def calculate_simple_interest(
    principal,
    monthly_rate,
    months
):
    interest = (
        principal
        * (monthly_rate / 100)
        * months
    )

    return {
        "interest": round(interest, 2),
        "total_due": round(
            principal + interest,
            2
        )
    }

def calculate_compound_interest(
    principal,
    monthly_rate,
    months
):
    amount = principal * (
        (1 + monthly_rate / 100)
        ** months
    )

    interest = amount - principal

    return {
        "interest": round(
            interest,
            2
        ),
        "total_due": round(
            amount,
            2
        )
    }