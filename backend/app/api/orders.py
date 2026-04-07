from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.order import OrderPlaceResponse
from app.services.order_service import place_order

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderPlaceResponse, status_code=status.HTTP_201_CREATED)
def create_order(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return place_order(db, current_user)
