import { useState } from 'react';
import useStore from '../store/useStore';
import { useToast } from '../context/ToastContext';
import {
  EMAILJS_SERVICE,
  EMAILJS_CUSTOMER_TEMPLATE,
  EMAILJS_ADMIN_TEMPLATE,
  EMAILJS_PUBLIC,
  WHATSAPP_NUMBER,
} from '../data/artworks';

// ── Generate a simple readable order ID ──────────────────────────────────────
function generateOrderId() {
  const ts   = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SD-${ts}-${rand}`;
}

export default function CheckoutModal() {
  const {
    cart, checkoutOpen, closeCheckout,
    clearCart, getSubtotal, getDiscount, getTotal,
  } = useStore();
  const toast = useToast();

  const [step,    setStep]    = useState('form'); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', pincode: '', state: '',
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total    = getTotal();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ── Build items list for email ────────────────────────────────────────────
  const buildItemsList = () =>
    cart.map((item, i) => {
      const type = item.isPrint
        ? `Print — ${item.printType?.label ?? ''} · ${item.printSize?.label ?? ''}`
        : 'Original Painting';
      return `${i + 1}. ${item.title}\n   Type: ${type}\n   Price: ₹${item.unitPrice.toLocaleString('en-IN')}`;
    }).join('\n\n');

  // ── Send both emails via EmailJS ──────────────────────────────────────────
  const sendEmails = async (txnId, oid) => {
    try {
      const emailjs = await import('@emailjs/browser');
      emailjs.init(EMAILJS_PUBLIC);

      const templateParams = {
        order_id:         oid,
        transaction_id:   txnId,
        customer_name:    form.name,
        customer_email:   form.email,
        customer_phone:   form.phone,
        shipping_address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        items_list:       buildItemsList(),
        subtotal_amount:  `₹${subtotal.toLocaleString('en-IN')}`,
        discount_amount:  discount > 0 ? `₹${discount.toLocaleString('en-IN')}` : 'None',
        total_amount:     `₹${total.toLocaleString('en-IN')}`,
        payment_method:   'Razorpay',
      };

      // Sequential to reduce spam score
      const cRes = await emailjs.send(EMAILJS_SERVICE, EMAILJS_CUSTOMER_TEMPLATE, templateParams, EMAILJS_PUBLIC);
      console.log('Customer email:', cRes.status, cRes.text);

      const aRes = await emailjs.send(EMAILJS_SERVICE, EMAILJS_ADMIN_TEMPLATE, templateParams, EMAILJS_PUBLIC);
      console.log('Admin email:', aRes.status, aRes.text);
    } catch (err) {
      console.error('EmailJS Error:', err?.text ?? err);
    }
  };

  // ── Load Razorpay SDK ─────────────────────────────────────────────────────
  const initRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const s  = document.createElement('script');
      s.src    = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  // ── Pay handler ───────────────────────────────────────────────────────────
  const handlePay = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast('Please fill in all required fields');
      return;
    }
    if (cart.length === 0) { toast('Your cart is empty'); return; }

    setLoading(true);
    const oid = generateOrderId();
    setOrderId(oid);

    const loaded = await initRazorpay();
    if (!loaded) {
      toast('Could not load payment gateway. Please refresh and try again.');
      setLoading(false);
      return;
    }

    const options = {
      key:         'rzp_live_TEesr2w67Mil8W',  // ← replace with live key when going live
      amount:      total * 100,                  // in paise
      currency:    'INR',
      name:        'Sarvesh Dalvi Art',
      description: `Order ${oid} — ${cart.length} item${cart.length > 1 ? 's' : ''}`,
      prefill:     { name: form.name, email: form.email, contact: form.phone },
      notes:       { order_id: oid },
      theme:       { color: '#B5541E' },

      handler: async (response) => {
        await sendEmails(response.razorpay_payment_id, oid);
        clearCart();
        setStep('success');
        setLoading(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (resp) => {
      console.error('Razorpay failure:', resp.error);
      toast(`Payment failed: ${resp.error?.description ?? 'Please try again.'}`);
      setLoading(false);
    });
    rzp.open();
  };

  // ── Close / reset ─────────────────────────────────────────────────────────
  const handleClose = () => {
    closeCheckout();
    setStep('form');
    setLoading(false);
    setOrderId('');
    setForm({ name: '', email: '', phone: '', address: '', city: '', pincode: '', state: '' });
  };

  if (!checkoutOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-head">
          <h2>{step === 'success' ? 'Order Confirmed!' : 'Checkout'}</h2>
          <button className="close-btn" onClick={handleClose} aria-label="Close">✕</button>
        </div>

        {/* ── SUCCESS ── */}
        {step === 'success' ? (
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-text">
              Your order <strong>{orderId}</strong> has been placed. Sarvesh will personally pack
              and ship your artwork with a Certificate of Authenticity. Expect delivery in
              7–14 business days within India.
            </p>

            <div style={{
              background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: '6px',
              padding: '0.85rem 1.1rem', margin: '0 auto 1.5rem', maxWidth: '380px',
              fontSize: '0.8rem', color: '#7B5800', lineHeight: 1.6, textAlign: 'left',
            }}>
              <strong>Confirmation email sent to {form.email}</strong><br />
              If you don't see it within 2 minutes, check your <strong>Spam</strong> or{' '}
              <strong>Promotions</strong> folder and mark it as "Not Spam".
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Sarvesh%2C%20I%20just%20placed%20order%20${orderId}%20on%20your%20website!`}
                target="_blank" rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                💬 Chat with Sarvesh
              </a>
              <button className="btn btn-secondary btn-sm" onClick={handleClose}>
                Continue Browsing
              </button>
            </div>
          </div>

        ) : (
          /* ── FORM ── */
          <div className="modal-body">

            <div className="modal-section-title">Shipping Details</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={onChange} placeholder="As on ID" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="form-input" name="phone" value={form.phone} onChange={onChange} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input className="form-input" name="address" value={form.address} onChange={onChange} placeholder="House / Flat / Street" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input className="form-input" name="city" value={form.city} onChange={onChange} placeholder="City" />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code *</label>
                <input className="form-input" name="pincode" value={form.pincode} onChange={onChange} placeholder="400001" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input className="form-input" name="state" value={form.state} onChange={onChange} placeholder="Maharashtra" />
            </div>

            {/* Razorpay badge — no selector needed */}
            <div className="modal-section-title">Payment</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.85rem 1rem',
              border: '1.5px solid var(--rust)',
              borderRadius: '6px',
              background: 'var(--rust-pale)',
              marginBottom: '1.25rem',
            }}>
              <span style={{ fontSize: '1.3rem' }}>🇮🇳</span>
              <div>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--rust)' }}>Razorpay</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPI · Cards · Net Banking · Wallets</p>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--rust)', fontWeight: 600, letterSpacing: '0.1em' }}>
                SECURE
              </span>
            </div>

            {/* Order summary */}
            <div className="modal-section-title">Order Summary</div>
            {cart.map((item) => (
              <div className="order-summary-item" key={item.cartKey}>
                <span>
                  {item.title}
                  {item.isPrint
                    ? ` — Print (${item.printType?.label ?? ''}, ${item.printSize?.label ?? ''})`
                    : ' — Original'}
                </span>
                <span>₹{item.unitPrice.toLocaleString('en-IN')}</span>
              </div>
            ))}
            {discount > 0 && (
              <div className="order-summary-item" style={{ color: '#2E7D32' }}>
                <span>10% Discount (3+ originals)</span>
                <span>−₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="order-summary-item">
              <span>Shipping</span>
              <span style={{ color: '#2E7D32', fontWeight: 500 }}>Free (Pan India)</span>
            </div>
            <div className="order-summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="checkout-note">
              🔒 Secured by Razorpay · Certificate of Authenticity included ·
              Gallery-grade packaging · Free insured shipping pan India
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={handlePay}
              disabled={loading}
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? 'Opening Payment…' : `Pay ₹${total.toLocaleString('en-IN')} via Razorpay`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
