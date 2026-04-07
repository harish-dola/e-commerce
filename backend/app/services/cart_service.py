from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.cart_item import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartResponse


def get_cart_items(db: Session, user_id: int) -> list[CartItem]:
    return (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == user_id)
        .order_by(CartItem.id.asc())
        .all()
    )


def build_cart_response(cart_items: list[CartItem]) -> CartResponse:
    total_amount = sum(Decimal(str(item.product.price)) * item.quantity for item in cart_items)
    return CartResponse(items=cart_items, total_amount=total_amount)


def get_cart(db: Session, user: User) -> CartResponse:
    return build_cart_response(get_cart_items(db, user.id))


def add_to_cart(db: Session, user: User, product_id: int, quantity: int) -> CartResponse:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    cart_item = db.query(CartItem).filter(CartItem.user_id == user.id, CartItem.product_id == product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(user_id=user.id, product_id=product_id, quantity=quantity)
        db.add(cart_item)

    db.commit()
    return get_cart(db, user)


def update_cart_item(db: Session, user: User, item_id: int, quantity: int) -> CartResponse:
    cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == user.id).first()
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found.")

    cart_item.quantity = quantity
    db.commit()
    return get_cart(db, user)


def remove_cart_item(db: Session, user: User, item_id: int) -> CartResponse:
    cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == user.id).first()
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found.")

    db.delete(cart_item)
    db.commit()
    return get_cart(db, user)


def clear_cart(db: Session, user: User) -> None:
    db.query(CartItem).filter(CartItem.user_id == user.id).delete()
    db.commit()
