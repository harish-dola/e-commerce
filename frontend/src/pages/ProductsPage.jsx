import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeProductId, setActiveProductId] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await apiClient.getProducts();
        setProducts(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleAddToCart(productId) {
    try {
      setActiveProductId(productId);
      await addItem(productId, 1);
    } catch (cartError) {
      setError(cartError.message);
    } finally {
      setActiveProductId(null);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2>Curated essentials for a modern lifestyle.</h2>
        </div>
      </div>

      {loading ? <div className="state-panel">Loading products...</div> : null}
      {error ? <div className="error-banner">{error}</div> : null}

      {!loading && !products.length ? <div className="state-panel">No products found.</div> : null}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isSubmitting={activeProductId === product.id}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
