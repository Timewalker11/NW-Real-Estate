from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.mailer import send_contact_email
from app.models import ContactMessage, User
from app.schemas import ContactOut, ContactRequest
from app.security import get_optional_current_user

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact_message(
    payload: ContactRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user),
):
    entry = ContactMessage(
        name=payload.name.strip(),
        email=str(payload.email).lower(),
        phone=payload.phone.strip() if payload.phone else None,
        message=payload.message.strip(),
        user_id=current_user.id if current_user else None,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)

    try:
        send_contact_email(entry.name, entry.email, entry.phone, entry.message)
    except Exception as exc:
        print(f"WARNING: failed to send contact email from {entry.email}: {exc}")

    return entry
