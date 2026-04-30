import "./ProductCard.css";

function ProductCard({
  Id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews = [],
  isBestSeller,
  isWishListed,
  onAddToCart,
  onToggleWish,
  onClickProduct,
}) {
  return (
    <div className="product-card">
      {/* discount badge */}
      {discount && <span className="discount-badge">{discount}</span>}
      <button
        className={`wishlisted ${isWishListed ? "active" : ""}`}
        onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
      >
        {isWishListed ? "❤" : "🤍"}
      </button>

      {/* product image - clickable */}
      <div className="image-container" onClick={onClickProduct} style={{cursor: onClickProduct ? "pointer" : "default"}}>
        <img src={image} alt={name} className="product-image" />
      </div>

      {/* content */}
      <div className="card-content">
        <h3 className="product-name" onClick={onClickProduct} style={{cursor: onClickProduct ? "pointer" : "default"}}>
          {name}
        </h3>

        {/* rating */}
        <div className="rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(Math.abs(5 - Math.floor(rating)))}
          </span>
          <span className="rating-value">{rating}</span>
          {reviews.length > 0 && (
            <span className="review-count">({reviews.length})</span>
          )}
        </div>

        {isBestSeller && <span className="bestseller">Best Seller</span>}

        {/* price */}
        <div className="price-row">
          <span className="price">₹{price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
