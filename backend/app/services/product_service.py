from sqlalchemy.orm import Session

from app.models.product import Product


def list_products(db: Session) -> list[Product]:
    return db.query(Product).order_by(Product.id.asc()).all()
