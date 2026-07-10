import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { WHATSAPP_URL } from '../data/artworks';

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  // const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast("Please fill in name, email and message");
      return;
    }

    const whatsappMessage = encodeURIComponent(`Hello Sarvesh,

    A new contact form enquiry has been submitted.

    ----------------------------------------
    Name      : ${form.name}
    Email     : ${form.email}
    Phone     : ${form.phone || "Not Provided"}
    Subject   : ${form.subject || "General Enquiry"}
    ----------------------------------------

    Message:
    ${form.message}

    Thank you.`);

    window.open(
      `${WHATSAPP_URL}?text=${whatsappMessage}`,
      "_blank"
    );

    toast("WhatsApp opened successfully. Please tap Send to deliver your enquiry.");
  };

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Get in Touch</p>
        <h1>Contact <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Us</em></h1>
        <p>Whether you'd like to acquire a painting, commission a custom work, or simply say hello — Sarvesh welcomes every message.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Contact</span>
        </nav>
      </div>

      <section className="section">
  <div className="container">
    <div
      className="two-col"
      style={{ gap: '4rem', alignItems: 'start' }}
    >
      {/* Form */}
      <div>
        <p
          className="section-tag"
          style={{ marginBottom: '1rem' }}
        >
          Send a Message
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label
                className="form-label"
                htmlFor="name"
              >
                Full Name *
              </label>
              <input
                id="name"
                className="form-input"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label
                className="form-label"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                className="form-input"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="subject"
            >
              Subject
            </label>
            <select
              id="subject"
              className="form-select"
              name="subject"
              value={form.subject}
              onChange={onChange}
            >
              <option value="">Select a topic…</option>
              <option value="Purchasing an Artwork">
                Purchasing an Artwork
              </option>
              <option value="Commission a Custom Painting">
                Commission a Custom Painting
              </option>
              <option value="Art Print Enquiry">
                Art Print Enquiry
              </option>
              <option value="Workshop / Courses">
                Workshop / Courses
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="message"
            >
              Message *
            </label>
            <textarea
              id="message"
              className="form-textarea"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Tell Sarvesh about your interest…"
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>

      {/* Info */}
      <div>
        <div
          style={{
            padding: '2rem',
            background: 'var(--parchment)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              marginBottom: '0.5rem',
            }}
          >
            Prefer to chat directly?
          </h3>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              marginBottom: '1.25rem',
              lineHeight: 1.7,
            }}
          >
            Sarvesh is most responsive on WhatsApp. Message him directly to discuss
            artworks, commissions, or anything else.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-full"
          >
            💬 WhatsApp — +91 7558411657
          </a>
        </div>

        {[
          {
            label: 'Email',
            val: 'Dalvisarvesh02292@gmail.com',
            href: 'mailto:Dalvisarvesh02292@gmail.com',
          },
          {
            label: 'Instagram',
            val: '@_sarveshdalvi_',
            href: 'https://www.instagram.com/_sarveshdalvi_',
          },
          {
            label: 'Response Time',
            val: 'Within 24 hours',
          },
          {
            label: 'Location',
            val: 'Maharashtra, India',
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.85rem 0',
              borderBottom: '1px solid var(--border-soft)',
              fontSize: '0.88rem',
            }}
          >
            <span
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>

            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--rust)' }}
              >
                {item.val}
              </a>
            ) : (
              <span style={{ color: 'var(--text-dark)' }}>
                {item.val}
              </span>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: '2rem',
            padding: '1.25rem',
            background: 'var(--warm-white)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            "Every collector, every commission, every message — I respond
            personally. Art is a relationship, not a transaction."
            <br />
            <strong style={{ color: 'var(--rust)' }}>
              — Sarvesh Dalvi
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
