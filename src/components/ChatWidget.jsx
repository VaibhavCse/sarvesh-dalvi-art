import { useState, useRef, useEffect } from 'react';

const KB = {
  price:      'Original paintings range from ₹38,000 to ₹85,000. Prints start at ₹4,500. Custom commissioned paintings start from ₹90,000 depending on size. Every original includes a Certificate of Authenticity and free shipping across India.',
  ship:       'Free shipping pan India on all original artworks. International shipping is available at actuals. Artworks are packed in gallery-grade archival materials and shipped fully insured.',
  commission: 'Sarvesh accepts commissions for custom devotional paintings. Sizes range from 2\'×3\' (₹90,000) to 5\'×7.5\' (₹5,60,000). Message him on WhatsApp: +91 7558411657.',
  print:      'Prints are high-quality reproductions of original works, available from ₹4,500. They make beautiful gifts and are significantly more affordable than originals.',
  hanuman:    'Sarvesh\'s Hanuman painting is one of his most beloved — layers of warm ochre and rust oils, capturing a moment of pure devotion. Available at ₹45,000.',
  krishna:    'The Radha Krishna series is central to Sarvesh\'s work. "Eternal Dance" (₹55,000) and "Radha Swayamvara" (₹62,000) are both available as originals and prints.',
  discount:   'Order 3 or more original paintings together and get a flat 10% off your entire order. Discount applies automatically at checkout!',
  workshop:   'Sarvesh is launching art workshops soon! Visit the Workshop page and join the waitlist to be notified when registrations open.',
  contact:    'You can reach Sarvesh at +91 7558411657 on WhatsApp, or use the Contact page on this website. He personally responds to every message.',
  default:    'That\'s a great question! For the most detailed answer, feel free to contact Sarvesh directly on WhatsApp at +91 7558411657. He personally responds to every message.',
};

function getReply(message) {
  const q = message.toLowerCase().trim();

  const intents = [
    {
      keywords: [
        "price","prices","cost","costs","rate","rates","amount","how much",
        "pricing","buy","purchase","worth","original","painting price"
      ],
      reply: KB.price,
    },
    {
      keywords: [
        "shipping","ship","delivery","deliver","courier","dispatch",
        "international","india","packing"
      ],
      reply: KB.ship,
    },
    {
      keywords: [
        "commission","custom","portrait","order","personalized",
        "personalised","custom painting","made for me"
      ],
      reply: KB.commission,
    },
    {
      keywords: [
        "print","prints","poster","canvas print","reproduction"
      ],
      reply: KB.print,
    },
    {
      keywords: [
        "hanuman","bajrang","maruti"
      ],
      reply: KB.hanuman,
    },
    {
      keywords: [
        "krishna","radha","radhe","gopal","kanha"
      ],
      reply: KB.krishna,
    },
    {
      keywords: [
        "discount","offer","sale","coupon","deal"
      ],
      reply: KB.discount,
    },
    {
      keywords: [
        "workshop","workshops","class","classes","course","learn","teaching"
      ],
      reply: KB.workshop,
    },
    {
      keywords: [
        "contact","call","phone","number","mobile","whatsapp",
        "email","reach","connect"
      ],
      reply: KB.contact,
    },
  ];

  for (const intent of intents) {
    if (intent.keywords.some(keyword => q.includes(keyword))) {
      return intent.reply;
    }
  }

  return KB.default;
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [msgs, setMsgs]       = useState([
    { role: 'bot', text: 'Namaste! 🙏 I\'m Sarvesh\'s Art Assistant. Ask me about artworks, pricing, commissions, shipping, or workshops!' },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = () => {
    const msg = input.trim();
    if (!msg) return;
    setMsgs((m) => [...m, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: getReply(msg) }]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-box" role="dialog" aria-label="Art assistant chat">
          <div className="chat-box-head">
            <div className="chat-box-dot" />
            <div>
              <div className="chat-box-title">Art Assistant</div>
              <div className="chat-box-sub">Typically replies instantly</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', marginLeft: 'auto', fontSize: '1rem' }}
              aria-label="Close chat"
            >✕</button>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {typing && <div className="chat-msg bot" style={{ opacity: 0.6 }}>Typing…</div>}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about art, pricing, shipping…"
              aria-label="Chat message"
            />
            <button className="chat-send-btn" onClick={send} aria-label="Send message">➤</button>
          </div>
        </div>
      )}

      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open art assistant chat"
        title="Chat with Art Assistant"
      >
        💬
      </button>
    </div>
  );
}
