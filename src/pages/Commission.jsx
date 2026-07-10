import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMMISSION_SIZES, COMMISSION_WA } from '../data/artworks';

const ACCORDIONS = [
  {
    title: 'The Commission Experience',
    body: `Once you reach out via WhatsApp or the contact form, Sarvesh will schedule a brief consultation to understand your vision — the deity, the scene, the mood, and the intended space. He then creates initial sketches for your approval before beginning the painting. Regular progress updates are shared throughout. The process typically takes 6–12 weeks depending on complexity and size.`,
  },
  {
    title: 'Pricing & Investment',
    body: `Commissions are priced based on size (see the table below). The price includes free delivery pan India, a Certificate of Authenticity, and composition and design edits to meet your vision. International shipping charges apply outside India. Framing is not included unless specified. 50% advance is required to begin work; the balance is due before shipping.`,
  },
  {
    title: 'Size & Scale',
    body: `Sarvesh works in four standard commission sizes: 2'×3', 3'×4.5', 4'×6', and 5'×7.5'. Custom sizes may be discussed. If you're unsure which size suits your space, share a photo of the intended wall and Sarvesh will recommend accordingly.`,
  },
];

function Accordion({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {title}
        <span className={`accordion-icon${open ? ' open' : ''}`}>▾</span>
      </button>
      {open && <div className="accordion-body">{body}</div>}
    </div>
  );
}

export default function Commission() {
  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Originals · Custom</p>
        <h1>Commission a <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Painting</em></h1>
        <p>Crafted with precision and patience, for those who value the rare and the timeless.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Originals</span><span>/</span><span>Customize a Painting</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          {/* Intro */}
          <div className="two-col" style={{ gap: '4rem', alignItems: 'start' }}>
            <div className="text-content">
              <p className="section-tag">About Commissions</p>
              <h2 className="section-title">Your Vision,<br /><em>His Devotion</em></h2>
              <div className="divider" />
              <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-mid)', margin: '1.25rem 0 1.75rem' }}>
                {[
                  'We create original fine art commissions inspired by temples, culture, landscapes, and beyond.',
                  'We are currently accepting a limited number of commissions from November 2026.',
                  'Kindly note: We do not accept portraits of people or replications of existing artworks.',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--rust)', flexShrink: 0, fontWeight: 600 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={COMMISSION_WA} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
                💬 Begin Your Commission
              </a>
            </div>

            <div>
              <div
                className="img-frame"
                style={{ background: 'linear-gradient(145deg, #C4956A22, #B5541E33)', fontSize: '5rem', height: '380px' }}
                aria-hidden="true"
              >
                ✍️
              </div>
            </div>
          </div>

          {/* Sample work scroll */}
          <div style={{ marginTop: '4rem' }}>
            <p className="section-tag" style={{ marginBottom: '1rem' }}>Sample Commissioned Works</p>
            <div className="commission-scroll" aria-label="Sample commissioned paintings">
              {['🙏', '🕌', '🏔️', '📖', '🕌', '🐘'].map((e, i) => (
                <div
                  key={i}
                  className="commission-img-card"
                  style={{ background: `linear-gradient(145deg, #C4956A${22 + i * 8}`, fontSize: '2.5rem' }}
                  role="img"
                  aria-label={`Sample commission ${i + 1}`}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div style={{ marginTop: '3.5rem' }}>
            <div className="accordion">
              {ACCORDIONS.map((a) => <Accordion key={a.title} {...a} />)}
            </div>
          </div>

          {/* Size & pricing table */}
          <div style={{ marginTop: '3.5rem' }}>
            <p className="section-tag" style={{ marginBottom: '1rem' }}>Size & Scale</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '0.5rem' }}>Pricing at a Glance</h3>

            {/* Visual size diagram */}
            <div style={{ background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1.5rem', minHeight: '160px' }}>
              {COMMISSION_SIZES.map((s, i) => (
                <div key={s.size} style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'var(--warm-white)',
                    border: '1.5px solid var(--rust)',
                    borderRadius: '4px',
                    width: `${50 + i * 22}px`,
                    height: `${60 + i * 25}px`,
                    margin: '0 auto 0.5rem',
                    opacity: 0.6 + i * 0.1,
                  }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)', fontWeight: 500 }}>{s.size}</div>
                </div>
              ))}
            </div>

            <div className="size-table-wrap">
              <table className="size-table" aria-label="Commission sizes and prices">
                <thead>
                  <tr>
                    <th scope="col">Size (in feet)</th>
                    <th scope="col">Cost (in INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMISSION_SIZES.map((s) => (
                    <tr key={s.size}>
                      <td>{s.size}</td>
                      <td>{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="include-grid">
              <div className="include-box">
                <h4>Inclusions</h4>
                <ul className="include-list">
                  <li>Delivery PAN India</li>
                  <li>Composition changes & design edits to meet your vision</li>
                  <li>Certificate of Authenticity</li>
                  <li>Progress updates throughout</li>
                </ul>
              </div>
              <div className="include-box">
                <h4>Exclusions</h4>
                <ul className="include-list">
                  <li>Shipping charges apply outside India</li>
                  <li>Framing (unless specified otherwise)</li>
                  <li>Any items not explicitly mentioned in inclusions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ready to begin CTA */}
          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem 2rem', background: 'var(--parchment)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '0.75rem' }}>Ready to Begin?</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.75rem' }}>
              Let's Create Something <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Sacred</em>
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Message Sarvesh on WhatsApp to start your commission. He personally responds to every inquiry and will guide you through every step.
            </p>
            <a href={COMMISSION_WA} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
              💬 Start on WhatsApp — +91 7558411657
            </a>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Or use the <Link to="/contact" style={{ color: 'var(--rust)' }}>Contact page</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
