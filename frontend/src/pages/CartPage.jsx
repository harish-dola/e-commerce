import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, loading, updateItem, removeItem } = useCart();
  const [error, setError] = useState('');

  async function handleUpdate(itemId, quantity) {
    try {
      setError('');
      await updateItem(itemId, quantity);
    } catch (updateError) {
      setError(updateError.message);
    }
  }

  async function handleRemove(itemId) {
    try {
      setError('');
      await removeItem(itemId);
    } catch (removeError) {
      setError(removeError.message);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Your Cart</p>
          <h2>Review your selected items before checkout.</h2>
        </div>
      </div>

      {loading ? <div className="state-panel">Loading cart...</div> : null}
      {error ? <div className="error-banner">{error}</div> : null}

      {!loading && !cart.items.length ? (
        <div className="empty-panel">
          <h3>Your cart is empty.</h3>
          <p>Add a few products to continue.</p>
          <Link className="primary-button" to="/products">
            Browse products
          </Link>
        </div>
      ) : null}

      {cart.items.length ? (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.product.image_url} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>${Number(item.product.price).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <select
                    value={item.quantity}
                    onChange={(event) => handleUpdate(item.id, Number(event.target.value))}
                    className="quantity-select"
                  >
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        Qty {quantity}
                      </option>
                    ))}
                  </select>
                  <button className="text-button" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="summary-card">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Items</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${Number(cart.total_amount).toFixed(2)}</span>
            </div>
            <Link className="primary-button full-width" to="/checkout">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      ) : null}
    </section>
  );
}

export default CartPage;
