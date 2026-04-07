from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.cart import CartItemMutation, CartItemUpdate, CartResponse
from app.services.cart_service import add_to_cart, get_cart, remove_cart_item, update_cart_item

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get("", response_model=CartResponse)
def read_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_cart(db, current_user)


@router.post("/items", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def create_cart_item(
    payload: CartItemMutation,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return add_to_cart(db, current_user, payload.product_id, payload.quantity)


@router.put("/items/{item_id}", response_model=CartResponse)
def change_cart_item(
    item_id: int,
    payload: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return update_cart_item(db, current_user, item_id, payload.quantity)


@router.delete("/items/{item_id}", response_model=CartResponse)
def delete_cart_item(item_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return remove_cart_item(db, current_user, item_id)
