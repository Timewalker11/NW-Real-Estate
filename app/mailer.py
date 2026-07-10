import os
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv

load_dotenv()

GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")


def send_welcome_email(to_email: str, name: str) -> None:
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print("WARNING: GMAIL_USER/GMAIL_APP_PASSWORD not set; skipping welcome email.")
        return

    message = EmailMessage()
    message["Subject"] = "Welcome to NW Real Estate"
    message["From"] = f"NW Real Estate <{GMAIL_USER}>"
    message["To"] = to_email
    message.set_content(
        f"Hi {name},\n\n"
        "Welcome to NW Real Estate! Your account has been created successfully.\n\n"
        "You can now browse listings, save favorites, and use our mortgage tools.\n\n"
        "Thanks for signing up!"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        smtp.send_message(message)
