import { useState, useRef, useEffect } from "react";

const BOT_REPLIES = {
  hello: "Hello! 👋 Welcome to TechStore support. How can I help you today?",
  hi: "Hi there! 😊 What can I assist you with?",
  hey: "Hey! How can I help you today?",
  order: "To check your order status, please go to the 'Orders' section from the navigation bar. You can track your order in real-time there! 📦",
  track: "You can track your orders from the 'Orders' page. Each order has a live tracking bar showing its current status. 🚚",
  refund: "Refunds are processed within 5-7 business days after order cancellation. You can cancel from your Orders page. 💰",
  cancel: "To cancel an order, go to Orders → click 'Cancel Order' → select a reason → confirm. Refund will be processed automatically. ❌",
  shipping: "We offer free shipping on orders over ₹500! Standard delivery takes 3-5 business days. 📦",
  payment: "We accept all major credit cards. Payments are secured with 256-bit SSL encryption and OTP verification. 🔒",
  return: "Returns are accepted within 30 days of delivery. Please contact us with your order ID for return instructions. 📋",
  help: "I can help with: orders, tracking, refunds, cancellations, shipping, payments, and returns. Just ask! 🤝",
  thanks: "You're welcome! 😊 Is there anything else I can help with?",
  bye: "Goodbye! Have a great day! 👋 Feel free to reach out anytime.",
  price: "Our prices are competitive and we frequently have amazing deals. Check out the 'Today's Deals' section! 💸",
  warranty: "All products come with manufacturer warranty. Extended warranty options are available at checkout. 🛡️",
  default: "Thanks for your message! A support agent will review your query shortly. In the meantime, you can ask me about orders, tracking, refunds, shipping, or payments. 🤖"
};

function getBotReply(message) {
  const lower = message.toLowerCase();
  for (const [keyword, reply] of Object.entries(BOT_REPLIES)) {
    if (keyword !== "default" && lower.includes(keyword)) {
      return reply;
    }
  }
  return BOT_REPLIES.default;
}

export default function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm TechBot, your virtual assistant. How can I help you today?", isBot: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e, textOverride = null) => {
    if (e) e.preventDefault();
    const userMsg = textOverride || input.trim();
    if (!userMsg) return;
    
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsgs = [...messages, { text: userMsg, isBot: false, time: timeNow }];
    setMessages(newMsgs);
    setInput("");
    setIsTyping(true);

    // Bot reply with typing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(userMsg);
      setMessages(prev => [...prev, { text: reply, isBot: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, delay);
  };

  return (
    <>
      <button className="support-fab" onClick={() => setIsOpen(!isOpen)} title="Chat with us">
        {isOpen ? "✖" : "💬"}
      </button>

      {isOpen && (
        <div className="support-window">
          <div className="support-header">
            <div className="support-header-info">
              <div className="bot-avatar">🤖</div>
              <div>
                <h4>TechBot Assistant</h4>
                <div className="support-status">🟢 Online — Typically replies instantly</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="support-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-wrapper ${msg.isBot ? "bot" : "user"}`}>
                <div className={`chat-bubble ${msg.isBot ? "bot" : "user"}`}>
                  {msg.text}
                </div>
                <div className="chat-time">{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-wrapper bot">
                <div className="chat-bubble bot typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            {!isTyping && messages.length > 0 && messages[messages.length - 1].isBot && (
              <div className="chat-quick-actions">
                <button onClick={() => handleSend(null, "Track my order")}>🚚 Track Order</button>
                <button onClick={() => handleSend(null, "Return policy")}>📋 Returns</button>
                <button onClick={() => handleSend(null, "Speak to a human")}>💬 Speak to Agent</button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="support-input" onSubmit={(e) => handleSend(e)}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              autoFocus
            />
            <button type="submit" title="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
