import { useState } from "react";

export default function Checkout({ cartItems, cartPrice, user, onLoginRequired, onPay, onRemoveFromCart, onUpdateQty, onGoShopping, onProductClick }) {
  const [address, setAddress] = useState(user?.address || "");
  const [locating, setLocating] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  function applyPromoCode(e) {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "TECH10") {
      setDiscountPercent(0.10);
      alert("✅ 10% Discount Applied!");
    } else if (code === "TECH20") {
      setDiscountPercent(0.20);
      alert("✅ 20% Discount Applied!");
    } else {
      setDiscountPercent(0);
      alert("❌ Invalid promo code.");
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-container empty-state">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button className="btn-primary" onClick={onGoShopping} style={{marginTop: "1rem"}}>Continue Shopping</button>
      </div>
    );
  }

  function handleAutoLocation(e) {
    e.preventDefault();
    setLocating(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const resp = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await resp.json();
            const addr = data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
            setAddress(addr);
            setLocationFound(true);
          } catch {
            setAddress(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
            setLocationFound(true);
          }
          setLocating(false);
        },
        () => {
          // Fallback if denied
          setAddress("123 Main Street, New York, NY 10001, USA");
          setLocationFound(true);
          setLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setAddress("123 Main Street, New York, NY 10001, USA");
      setLocationFound(true);
      setLocating(false);
    }
  }

  const shippingFee = cartPrice > 500 ? 0 : 9.99;
  const tax = +(cartPrice * 0.08).toFixed(2);
  const discountAmount = +(cartPrice * discountPercent).toFixed(2);
  const grandTotal = +(cartPrice - discountAmount + shippingFee + tax).toFixed(2);

  return (
    <div className="page-container checkout-page">
      <div className="checkout-grid">
        {/* Left Side: Cart Items */}
        <div className="checkout-items">
          <h2>Order Summary ({cartItems.length} items)</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item-card">
              <img src={item.image} alt={item.name} onClick={() => onProductClick && onProductClick(item.id)} style={{cursor: "pointer"}} />
              <div className="checkout-item-details">
                <h4 onClick={() => onProductClick && onProductClick(item.id)} style={{cursor: "pointer", transition: "color 0.2s"}} onMouseOver={(e) => e.target.style.color = "var(--accent-color)"} onMouseOut={(e) => e.target.style.color = ""}>{item.name}</h4>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                  <span style={{fontWeight: 600, minWidth: "24px", textAlign: "center"}}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                </div>
                <p className="price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>✖</button>
            </div>
          ))}
          <div className="checkout-total" style={{textAlign: "left"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", color: "var(--text-secondary)", fontSize: "0.9rem"}}>
              <span>Subtotal:</span><span>₹{cartPrice.toFixed(2)}</span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", color: "var(--text-secondary)", fontSize: "0.9rem"}}>
              <span>Shipping:</span><span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", color: "var(--text-secondary)", fontSize: "0.9rem"}}>
              <span>Tax (8%):</span><span>₹{tax}</span>
            </div>
            
            {discountPercent > 0 && (
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", color: "var(--success)", fontSize: "0.95rem", fontWeight: 700}}>
                <span>Discount ({discountPercent * 100}% off):</span><span>-₹{discountAmount}</span>
              </div>
            )}
            
            <form onSubmit={applyPromoCode} style={{display: "flex", gap: "0.5rem", marginBottom: "1rem"}}>
              <input 
                type="text" 
                placeholder="Promo code (e.g. TECH10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{flex: 1, padding: "0.5rem 0.8rem", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-surface)", color: "var(--text-primary)", outline: "none"}}
              />
              <button type="submit" className="btn-secondary small" style={{padding: "0.5rem 1rem"}}>Apply</button>
            </form>

            <div style={{display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "0.8rem"}}>
              <h3>Grand Total:</h3><h3 style={{color: "var(--accent-color)"}}>₹{grandTotal}</h3>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="checkout-form">
          <h2>Shipping & Payment</h2>
          {!user ? (
            <div className="login-prompt">
              <p>🔐 Please log in to proceed with checkout securely.</p>
              <button className="btn-primary" onClick={onLoginRequired}>Sign In to Continue</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); onPay(grandTotal, paymentMethod); }}>
              <div className="form-group">
                <label>📍 Shipping Address</label>
                {user?.addresses && user.addresses.length > 0 && (
                  <select 
                    onChange={(e) => {
                      if(e.target.value !== 'custom') setAddress(e.target.value);
                    }} 
                    style={{marginBottom: '0.8rem', padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', width: '100%', fontFamily: 'inherit'}}
                  >
                    <option value="custom">-- Select a Saved Address --</option>
                    {user.addresses.map(a => (
                      <option key={a.id} value={a.detail}>{a.label} ({a.detail.slice(0, 20)}...)</option>
                    ))}
                  </select>
                )}
                <textarea 
                  rows="3" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Enter your full shipping address..."
                  required
                />
                <button 
                  type="button"
                  className={`btn-secondary small location-btn ${locationFound ? "found" : ""}`} 
                  onClick={handleAutoLocation}
                  disabled={locating}
                >
                  {locating ? "📡 Detecting Location..." : locationFound ? "✅ Location Found" : "📍 Auto-Detect Location"}
                </button>
              </div>
              <div className="form-group" style={{marginTop: "1.5rem"}}>
                <label>💳 Payment Method</label>
                <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
                  <label style={{display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer"}}>
                    <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Credit/Debit Card
                  </label>
                  <label style={{display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer"}}>
                    <input type="radio" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} /> UPI
                  </label>
                  <label style={{display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer"}}>
                    <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /> Cash on Delivery
                  </label>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required maxLength="19" 
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                        e.target.value = v;
                      }}
                    />
                  </div>
                  <div className="form-row" style={{display: "flex", gap: "1rem"}}>
                    <div className="form-group" style={{flex: 1}}>
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required maxLength="5"
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length >= 2) v = v.slice(0,2) + "/" + v.slice(2);
                          e.target.value = v;
                        }}
                      />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                      <label>CVV</label>
                      <input type="password" placeholder="•••" required maxLength="3" />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "upi" && (
                <div className="form-group">
                  <label>UPI ID / VPA</label>
                  <input type="text" placeholder="username@upi" required pattern="[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}" />
                  <p style={{fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.3rem"}}>A payment request will be sent to this ID.</p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="form-group" style={{background: "rgba(255, 200, 87, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255, 200, 87, 0.3)"}}>
                  <p style={{fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 600}}>💸 Cash on Delivery Selected</p>
                  <p style={{fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.4rem"}}>You will pay ₹{grandTotal} to the delivery agent upon receiving your items. A 6-digit Security Code will be required to finalize this order.</p>
                </div>
              )}

               <button type="submit" className="btn-primary full-width" style={{marginTop: "1.5rem", padding: "0.8rem"}}>
                {paymentMethod === "cod" ? "✅ Confirm COD Order" : `🔐 Pay ₹${grandTotal} Securely`}
              </button>
              <p style={{textAlign: "center", marginTop: "0.8rem", fontSize: "0.75rem", color: "var(--text-secondary)"}}>
                🛡️ Your payment is protected with 256-bit SSL encryption
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
