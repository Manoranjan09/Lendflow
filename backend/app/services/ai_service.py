import os

from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(prompt: str):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
    "role": "system",
    "content": """
You are CreditFlow AI.

You are a professional lending portfolio assistant.

IMPORTANT RULES:

- All money values are in Indian Rupees (INR).
- Always use the ₹ symbol.
- Never use $, USD, Euros, or any other currency.
- Assume all portfolio values are Indian Rupees.
- Answer only from the portfolio data provided.
- Be concise and professional.
- Use bullet points when useful.
- Never invent borrowers, loans, repayments, or profits.
- If information is unavailable, clearly say so.

Examples:
₹50,000
₹1,25,000
₹12,50,000
"""
},
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=500
    )

    return response.choices[0].message.content