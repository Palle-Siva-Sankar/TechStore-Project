import { useState, useEffect } from "react";

export default function OTPModal({ onClose, onVerify, target }) {
  const [step, setStep] = useState(target === "login" ? "credentials" : "otp");
  const [authMode, setAuthMode] = useState("login"); // login or signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(() => {
    if (target === "payment") {
      // 6-digit OTP for payment
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    return "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (target === "payment") {
      generatePaymentOTP();
    }
  }, [target]);

  function generateLoginOTP() {
    // 4-digit OTP for login
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  }

  function generatePaymentOTP() {
    // 6-digit OTP for payment (different from login)
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  }

  function handleCredentialsSubmit(e) {
    e.preventDefault();
    if (!email || !password || (authMode === "signup" && !name)) {
      setError("Please fill out all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      generateLoginOTP();
    }, 800);
  }

  function handleOTPSubmit(e) {
    e.preventDefault();
    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      onVerify(email, name);
    }, 1000);
  }

  function handleResendOTP() {
    setOtp("");
    setError("");
    if (target === "login") {
      generateLoginOTP();
    } else {
      generatePaymentOTP();
    }
  }

  const isPayment = target === "payment";
  const otpLength = isPayment ? 6 : 4;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isPayment ? "🔒 Secure Payment" : authMode === "login" ? "👤 Sign In" : "✨ Create Account"}</h2>
        
        {step === "credentials" && (
          <>
            <p style={{marginBottom: "1.5rem", color: "var(--text-secondary)"}}>
              {authMode === "login" ? "Enter your email and password to continue." : "Fill in your details to get started."}
            </p>
            {error && <p style={{color: "var(--danger)", marginBottom: "1rem", fontSize: "0.85rem"}}>⚠️ {error}</p>}
            <form onSubmit={handleCredentialsSubmit} className="otp-form">
              {authMode === "signup" && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div style={{position: "relative"}}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min. 6 characters" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute", right: "10px", top: "50%", 
                      transform: "translateY(-50%)", fontSize: "1rem",
                      color: "var(--text-secondary)"
                    }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="modal-actions" style={{flexDirection: "column", gap: "1rem", marginTop: "1rem"}}>
                <button type="submit" className="btn-primary" disabled={loading} style={{width: "100%"}}>
                  {loading ? "Authenticating..." : "Continue →"}
                </button>
                <button type="button" className="btn-secondary" onClick={onClose} disabled={loading} style={{width: "100%", background: "transparent", border: "none"}}>Cancel</button>
              </div>
              
              {!isPayment && (
                <div style={{textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)"}}>
                  {authMode === "login" ? (
                    <>Don't have an account? <button type="button" onClick={() => setAuthMode("signup")} style={{color: "var(--accent-color)", fontWeight: "bold"}}>Sign up here</button></>
                  ) : (
                    <>Already have an account? <button type="button" onClick={() => setAuthMode("login")} style={{color: "var(--accent-color)", fontWeight: "bold"}}>Log in here</button></>
                  )}
                </div>
              )}
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <p style={{marginBottom: "1.5rem", color: "var(--text-secondary)"}}>
              {isPayment 
                ? "Enter the 6-digit OTP sent to your registered mobile to confirm payment."
                : `A 4-digit OTP has been sent to ${email}.`}
            </p>
            {error && <p style={{color: "var(--danger)", marginBottom: "1rem", fontSize: "0.85rem"}}>⚠️ {error}</p>}
            <form onSubmit={handleOTPSubmit} className="otp-form">
              <div className="otp-inputs">
                <input 
                  type="text" 
                  maxLength={otpLength}
                  placeholder={"X".repeat(otpLength)}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required 
                  style={{ letterSpacing: "12px", textAlign: "center", fontSize: "1.5rem" }}
                  autoFocus
                />
              </div>
              <div className={`otp-display-box ${isPayment ? "payment" : ""}`}>
                {isPayment ? "🔐" : "📧"} [SIMULATOR] Your {isPayment ? "Security Code" : "Login OTP"}: <strong>{generatedOtp}</strong>
              </div>
              <div style={{textAlign: "center", marginBottom: "1rem"}}>
                <button type="button" onClick={handleResendOTP} style={{color: "var(--accent-color)", fontSize: "0.85rem", textDecoration: "underline"}}>
                  Resend OTP
                </button>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Verifying..." : `Confirm ${isPayment ? "Payment" : "Login"}`}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
