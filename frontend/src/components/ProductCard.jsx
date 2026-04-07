function ProductCard({ product, onAddToCart, isSubmitting }) {
  return (
    <article className="product-card">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-footer">
          <span className="price">${Number(product.price).toFixed(2)}</span>
          <button className="primary-button" onClick={() => onAddToCart(product.id)} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
