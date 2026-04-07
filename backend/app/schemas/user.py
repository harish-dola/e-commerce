from pydantic import BaseModel, EmailStr


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {"from_attributes": True}
