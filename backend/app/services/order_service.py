from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User
from app.schemas.order import OrderPlaceResponse
from app.services.cart_service import get_cart_items


def place_order(db: Session, user: User) -> OrderPlaceResponse:
    cart_items = get_cart_items(db, user.id)
    if not cart_items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty.")

    total_amount = sum(Decimal(str(item.product.price)) * item.quantity for item in cart_items)
    order = Order(user_id=user.id, total_amount=total_amount)
    db.add(order)
    db.flush()

    for item in cart_items:
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.product.price,
            )
        )
        db.delete(item)

    db.commit()
    db.refresh(order)
    return OrderPlaceResponse(order_id=order.id, total_amount=order.total_amount, created_at=order.created_at)
