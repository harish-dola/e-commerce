from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class OrderPlaceResponse(BaseModel):
    order_id: int
    total_amount: Decimal
    created_at: datetime
    message: str = "Order placed successfully."
