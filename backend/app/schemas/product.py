from decimal import Decimal

from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: Decimal
    image_url: str

    model_config = {"from_attributes": True}
