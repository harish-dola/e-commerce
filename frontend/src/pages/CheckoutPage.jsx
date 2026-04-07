import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearAfterOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handlePlaceOrder() {
    try {
      setIsSubmitting(true);
      setError('');
      const response = await apiClient.placeOrder();
      clearAfterOrder();
      setSuccessMessage(`Order #${response.order_id} placed successfully.`);
      setTimeout(() => navigate('/products'), 1200);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!cart.items.length && !successMessage) {
    return (
      <section className="page-section">
        <div className="empty-panel">
          <h3>No items ready for checkout.</h3>
          <p>Add items to your cart before placing an order.</p>
          <Link className="primary-button" to="/products">
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="checkout-layout">
        <div className="summary-card">
          <p className="eyebrow">Checkout</p>
          <h2>Confirm your order</h2>
          <p className="muted-text">This starter keeps checkout intentionally simple so payment can be added later.</p>
          {cart.items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>${Number(cart.total_amount).toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-card">
          <h3>Shipping details</h3>
          <p className="muted-text">
            Hook your actual checkout flow here. This demo places the order directly from the current cart.
          </p>

          {error ? <div className="error-banner">{error}</div> : null}
          {successMessage ? <div className="success-banner">{successMessage}</div> : null}

          <button className="primary-button full-width" onClick={handlePlaceOrder} disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
          <Link className="secondary-button link-button" to="/cart">
            Back to cart
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
