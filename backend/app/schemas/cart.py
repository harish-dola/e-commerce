from decimal import Decimal

from pydantic import BaseModel, Field


class CartItemMutation(BaseModel):
    product_id: int
    quantity: int = Field(ge=1, le=50)


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1, le=50)


class CartProduct(BaseModel):
    id: int
    name: str
    price: Decimal
    image_url: str

    model_config = {"from_attributes": True}


class CartItemResponse(BaseModel):
    id: int
    quantity: int
    product: CartProduct

    model_config = {"from_attributes": True}


class CartResponse(BaseModel):
    items: list[CartItemResponse]
    total_amount: Decimal
