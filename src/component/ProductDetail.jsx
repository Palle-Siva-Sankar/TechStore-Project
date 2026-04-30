import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductDetail({ product, allProducts, wishlist, onAddToCart, onToggleWish, onGoBack, onViewProduct }) {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Similar products: same category, excluding current
  const similar = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Also bought: different category, top rated
  const alsoBought = allProducts
    .filter(p => p.category !== product.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Pseudo-random stock based on product ID character hash
  const stockLeft = (product.id.toString().charCodeAt(0) % 7) + 2;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied product link to clipboard!");
  }

  return (
    <div className="page-container product-detail-page">
      <button className="back-btn" onClick={onGoBack}>← Back</button>

      <div className="pd-main">
        {/* Product Image */}
        <div className="pd-image-section">
          <div className="pd-image-box">
            <img src={product.image} alt={product.name} />
            {product.discount && <span className="pd-discount">{product.discount}</span>}
          </div>
        </div>

        {/* Product Info */}
        <div className="pd-info-section">
          {product.isBestSeller && <span className="pd-best-seller">⭐ Best Seller</span>}
          <h1 className="pd-title">{product.name}</h1>
          
          <div className="pd-rating">
            <span className="pd-stars">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="pd-rating-value">{product.rating} / 5.0</span>
            <span className="pd-reviews">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="pd-price-box">
            <span className="pd-price">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="pd-original-price">₹{product.originalPrice}</span>
                <span className="pd-save">Save ₹{product.originalPrice - product.price}</span>
              </>
            )}
          </div>

          <div className="pd-meta">
            <div className="pd-meta-item">📦 <strong>Free Delivery</strong> {product.price > 500 ? "Eligible" : "on orders ₹500+"}</div>
            {stockLeft <= 4 ? (
              <div className="pd-meta-item" style={{color: "var(--accent-color)"}}>⚠️ <strong>Only {stockLeft} left in stock</strong> — order soon!</div>
            ) : (
              <div className="pd-meta-item">✅ <strong>In Stock</strong> — Ships within 24 hours</div>
            )}
            <div className="pd-meta-item">🔄 <strong>30-Day Returns</strong> — Hassle-free</div>
            <div className="pd-meta-item">🛡️ <strong>Warranty</strong> — 1 Year Manufacturer</div>
          </div>

          <div className="pd-actions">
            <div className="pd-qty-selector">
              <label>Qty:</label>
              <select value={selectedQty} onChange={e => setSelectedQty(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <button className="btn-primary pd-cart-btn" onClick={() => {
              for (let i = 0; i < selectedQty; i++) onAddToCart(product);
            }}>
              🛒 Add to Cart
            </button>
            <button 
              className={`pd-wish-btn ${wishlist.includes(product.id) ? "active" : ""}`}
              onClick={() => onToggleWish(product.id)}
              title="Add to Wishlist"
            >
              {wishlist.includes(product.id) ? "❤️" : "🤍"}
            </button>
            <button 
              className="pd-wish-btn" 
              onClick={handleShare}
              title="Share Product"
              style={{fontSize: "1.2rem"}}
            >
              🔗
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <div className="pd-tabs">
        <button className={`pd-tab ${activeTab === "description" ? "active" : ""}`} onClick={() => setActiveTab("description")}>Description</button>
        <button className={`pd-tab ${activeTab === "specs" ? "active" : ""}`} onClick={() => setActiveTab("specs")}>Specifications</button>
        <button className={`pd-tab ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
          Reviews ({product.reviews?.length || 0})
        </button>
      </div>
      <div className="pd-tab-content">
        {activeTab === "description" && (
          <p>The {product.name} delivers exceptional performance and premium build quality. 
          Built for professionals and enthusiasts alike, it combines cutting-edge technology with 
          refined design. Featuring the latest innovations from {product.brand}, this product 
          offers outstanding value in the {product.category} category.</p>
        )}
        {activeTab === "specs" && (
          <div className="pd-specs-grid">
            <div className="pd-spec"><strong>Brand</strong><span>{product.brand}</span></div>
            <div className="pd-spec"><strong>Category</strong><span>{product.category}</span></div>
            <div className="pd-spec"><strong>Rating</strong><span>{product.rating} / 5.0</span></div>
            <div className="pd-spec"><strong>Price</strong><span>₹{product.price}</span></div>
            <div className="pd-spec"><strong>Availability</strong><span>In Stock</span></div>
            <div className="pd-spec"><strong>Warranty</strong><span>1 Year</span></div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="pd-reviews-section">
            <div className="pd-reviews-header">
              <div className="pd-rating-summary">
                <div className="pd-rating-big">{product.rating}</div>
                <div className="pd-stars-big">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <div className="pd-rating-count">Based on {product.reviews?.length || 0} reviews</div>
              </div>
              <div className="pd-rating-bars">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = product.reviews?.filter(r => r.rating === star).length || 0;
                  const percent = product.reviews?.length ? (count / product.reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="pd-rating-bar-row">
                      <span>{star} ★</span>
                      <div className="pd-bar-bg"><div className="pd-bar-fill" style={{ width: `${percent}%` }}></div></div>
                      <span className="pd-bar-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pd-reviews-list">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map(review => (
                  <div key={review.id} className="pd-review-item">
                    <div className="pd-review-user">
                      <img src={review.avatar} alt={review.user} className="pd-review-avatar" />
                      <div className="pd-user-info">
                        <strong>{review.user}</strong>
                        {review.verified && <span className="pd-verified">✓ Verified Purchase</span>}
                      </div>
                      <span className="pd-review-date">{review.date}</span>
                    </div>
                    <div className="pd-review-rating">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="pd-review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="pd-no-reviews">No reviews yet. Be the first to review this product!</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Similar Products */}
      {similar.length > 0 && (
        <div className="pd-similar">
          <h2>Similar Products in {product.category}</h2>
          <div className="pd-similar-grid">
            {similar.map(p => (
              <ProductCard
                key={p.id}
                Id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                originalPrice={p.originalPrice}
                discount={p.discount}
                rating={p.rating}
                reviews={p.reviews}
                isBestSeller={p.isBestSeller}
                isWishListed={wishlist.includes(p.id)}
                onAddToCart={() => onAddToCart(p)}
                onToggleWish={() => onToggleWish(p.id)}
                onClickProduct={() => onViewProduct(p.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Customers Also Bought */}
      {alsoBought.length > 0 && (
        <div className="pd-similar">
          <h2>Customers Also Bought</h2>
          <div className="pd-similar-grid">
            {alsoBought.map(p => (
              <ProductCard
                key={p.id}
                Id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                originalPrice={p.originalPrice}
                discount={p.discount}
                rating={p.rating}
                reviews={p.reviews}
                isBestSeller={p.isBestSeller}
                isWishListed={wishlist.includes(p.id)}
                onAddToCart={() => onAddToCart(p)}
                onToggleWish={() => onToggleWish(p.id)}
                onClickProduct={() => onViewProduct(p.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
