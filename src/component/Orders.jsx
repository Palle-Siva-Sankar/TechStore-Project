import { useState, useEffect } from "react";

const TRACKING_STEPS = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
const CANCEL_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Item not needed anymore",
  "Delivery taking too long",
  "Other"
];

export default function Orders({ orders, onUpdateOrder, onViewProduct }) {
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelDetails, setCancelDetails] = useState("");
  const [liveStatuses, setLiveStatuses] = useState({});

  // Live tracking simulator - advances order status every 8 seconds
  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const interval = setInterval(() => {
      setLiveStatuses(prev => {
        const updated = { ...prev };
        orders.forEach(order => {
          if (order.status === "Cancelled") return;
          const currentStep = updated[order.id] ?? 1; // default: Processing
          if (currentStep < TRACKING_STEPS.length - 1) {
            updated[order.id] = currentStep + 1;
          }
        });
        return updated;
      });
    }, 120000); // 120 seconds for slower, more realistic delivery simulation

    return () => clearInterval(interval);
  }, [orders]);

  // Initialize status for new orders
  useEffect(() => {
    if (!orders) return;
    setLiveStatuses(prev => {
      const updated = { ...prev };
      orders.forEach(order => {
        if (!(order.id in updated) && order.status !== "Cancelled") {
          updated[order.id] = 1; // Start at "Processing"
        }
      });
      return updated;
    });
  }, [orders]);

  function getTrackingStep(order) {
    if (order.status === "Cancelled") return -1;
    return liveStatuses[order.id] ?? 1;
  }

  function getStatusLabel(order) {
    if (order.status === "Cancelled") return "Cancelled";
    const step = getTrackingStep(order);
    return TRACKING_STEPS[step] || "Processing";
  }

  function handleCancelSubmit() {
    if (!cancelReason) return;
    onUpdateOrder(cancellingId, { 
      status: "Cancelled", 
      cancelReason, 
      cancelDetails 
    });
    setCancellingId(null);
    setCancelReason("");
    setCancelDetails("");
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="page-container empty-state">
        <div className="empty-icon">📦</div>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders. Start exploring our products!</p>
      </div>
    );
  }

  return (
    <div className="page-container orders-page">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map(order => {
          const currentStep = getTrackingStep(order);
          const statusLabel = getStatusLabel(order);
          const statusClass = statusLabel.toLowerCase().replace(/ /g, "-");
          const isCancelled = order.status === "Cancelled";
          const isDelivered = currentStep >= TRACKING_STEPS.length - 1;
          const canCancel = !isCancelled && !isDelivered;
          const progressWidth = isCancelled ? 0 : ((currentStep) / (TRACKING_STEPS.length - 1)) * 100;

          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">📦 Order {order.id}</span>
                  <span className="order-date">Placed on {order.date}</span>
                </div>
                <span className={`order-status ${statusClass}`}>{statusLabel}</span>
              </div>
              
              {/* Live Tracking */}
              {!isCancelled && (
                <div className="order-tracking">
                  <div className="track-progress" style={{width: `calc(${progressWidth}% - 2rem)`}}></div>
                  {TRACKING_STEPS.map((step, idx) => (
                    <div 
                      key={step} 
                      className={`track-step ${idx < currentStep ? "completed" : ""} ${idx === currentStep ? "active" : ""}`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              )}

              {isCancelled && (
                <div style={{
                  padding: "1rem", 
                  background: "rgba(255,107,107, 0.08)", 
                  borderRadius: "10px", 
                  margin: "1rem 0",
                  border: "1px solid rgba(255,107,107, 0.2)"
                }}>
                  <p style={{color: "var(--danger)", fontWeight: 600, marginBottom: "0.3rem"}}>❌ Order Cancelled</p>
                  <p style={{color: "var(--text-secondary)", fontSize: "0.85rem"}}>
                    Reason: {order.cancelReason}
                    {order.cancelDetails && ` — ${order.cancelDetails}`}
                  </p>
                </div>
              )}

              {/* Live Tracking Map */}
              {!isCancelled && !isDelivered && currentStep > 0 && (
                <div className="order-map-container" style={{
                  marginTop: "1.5rem",
                  marginBottom: "1rem",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                  position: "relative",
                  background: "var(--bg-card)"
                }}>
                  <div style={{
                    padding: "0.6rem 1rem", 
                    background: "var(--bg-surface)",
                    borderBottom: "1px solid var(--border-color)",
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span style={{fontWeight: 600, fontSize: "0.9rem"}}><span className="icon" style={{marginRight: "6px"}}>🌍</span> Live GPS Tracking</span>
                    <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                      <span className="live-dot" style={{
                        width: "8px", height: "8px", background: "var(--success)", borderRadius: "50%",
                        boxShadow: "0 0 8px var(--success)", display: "inline-block", animation: "pulse 1.5s infinite"
                      }}></span>
                      <span style={{fontSize: "0.8rem", color: "var(--success)", fontWeight: 600}}>Driver assigned</span>
                    </div>
                  </div>
                  <iframe 
                    width="100%" 
                    height="180" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=-74.015,40.705,-73.985,40.735&layer=mapnik&marker=40.72,-74.00`}
                    style={{display: "block", filter: "contrast(1.1) saturate(1.2)"}}
                  ></iframe>
                </div>
              )}

              <div className="order-items">
                {order.items.map(item => (
                  <div 
                    key={item.id} 
                    className="mini-item clickable-product"
                    onClick={() => onViewProduct(item.id)}
                    title="View Product Details"
                  >
                    <img src={item.image} alt={item.name} />
                    <span>{item.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <strong>Total: ₹{order.total.toFixed(2)}</strong>
                {canCancel && (
                  <button className="btn-danger" style={{padding: "0.4rem 1rem", fontSize: "0.8rem"}} onClick={() => setCancellingId(order.id)}>
                    Cancel Order
                  </button>
                )}
                {isDelivered && !isCancelled && (
                  <span style={{color: "var(--success)", fontWeight: 600, fontSize: "0.9rem"}}>✅ Delivered</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Order Modal */}
      {cancellingId && (
        <div className="cancel-modal-overlay" onClick={(e) => e.target === e.currentTarget && setCancellingId(null)}>
          <div className="cancel-modal">
            <h3>Cancel Order {cancellingId}</h3>
            <p style={{color: "var(--text-secondary)", marginBottom: "1.2rem", fontSize: "0.9rem"}}>
              Please select a reason for cancellation:
            </p>
            <div className="cancel-reasons">
              {CANCEL_REASONS.map(reason => (
                <div 
                  key={reason} 
                  className="cancel-reason-option"
                  onClick={() => setCancelReason(reason)}
                  style={cancelReason === reason ? {borderColor: "var(--accent-color)", background: "rgba(108,92,231,0.08)"} : {}}
                >
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason} 
                    checked={cancelReason === reason}
                    onChange={() => setCancelReason(reason)}
                  />
                  <label>{reason}</label>
                </div>
              ))}
            </div>

            {cancelReason === "Other" && (
              <textarea 
                className="cancel-details-input"
                placeholder="Please describe your reason..."
                rows="3"
                value={cancelDetails}
                onChange={(e) => setCancelDetails(e.target.value)}
              />
            )}

            {cancelReason && cancelReason !== "Other" && (
              <textarea 
                className="cancel-details-input"
                placeholder="Any additional details? (optional)"
                rows="2"
                value={cancelDetails}
                onChange={(e) => setCancelDetails(e.target.value)}
              />
            )}

            <div className="cancel-actions">
              <button className="btn-secondary" onClick={() => { setCancellingId(null); setCancelReason(""); setCancelDetails(""); }}>
                Keep Order
              </button>
              <button className="btn-danger" disabled={!cancelReason} onClick={handleCancelSubmit}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
