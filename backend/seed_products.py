from app.db.session import SessionLocal
from app.models.product import Product


PRODUCTS = [
    {
        "name": "Nimbus Desk Lamp",
        "description": "A dimmable aluminum desk lamp designed for focused evening work.",
        "price": 89.00,
        "image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    },
    {
        "name": "Canvas Weekender",
        "description": "A durable overnight bag with a clean silhouette and reinforced handles.",
        "price": 129.00,
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    },
    {
        "name": "Stoneware Bottle",
        "description": "An insulated bottle with matte ceramic texture and all-day temperature control.",
        "price": 42.00,
        "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    },
    {
        "name": "Orbit Headphones",
        "description": "Wireless over-ear headphones with balanced sound and 30-hour battery life.",
        "price": 219.00,
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    },
]


def run():
    session = SessionLocal()
    try:
        existing_count = session.query(Product).count()
        if existing_count:
            print("Products already exist. Skipping seed.")
            return

        session.add_all([Product(**product) for product in PRODUCTS])
        session.commit()
        print(f"Seeded {len(PRODUCTS)} products.")
    finally:
        session.close()


if __name__ == "__main__":
    run()
