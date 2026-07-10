import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Workshop() {
  const toast = useToast();
  const [email, setEmail] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email) { toast('Please enter your email'); return; }
    toast('You\'re on the list! We\'ll notify you when workshops open.');
    setEmail('');
  };

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Coming Soon</p>
        <h1>Art <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Workshop</em></h1>
        <p>Learn the art of devotional oil painting with Sarvesh Dalvi.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Workshop</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="coming-soon-wrap">
            <span className="coming-soon-badge">Coming Soon</span>

            <h2 className="coming-soon-title">
              Learn to Paint the <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Divine</em>
            </h2>

            <p className="coming-soon-desc">
              Sarvesh is preparing a series of art workshops and online courses focused on
              devotional oil painting — from basic techniques to advanced mythological compositions.
              Join the waitlist to be the first to know when registrations open.
            </p>

            {/* <form className="notify-form" onSubmit={handleNotify} aria-label="Notify me form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                required
              />
              <button type="submit" className="btn btn-primary">Notify Me</button>
            </form> */}

            {/* <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              No spam. Unsubscribe anytime. We'll only write when workshops are ready.
            </p> */}

            {/* What to expect */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '4rem', width: '100%', maxWidth: '900px', textAlign: 'left' }}>
              {[
                { icon: '🎨', title: 'Oil Painting Fundamentals', desc: 'Colour mixing, brush techniques, and the basics of building a devotional composition.' },
                { icon: '🕉️', title: 'Mythological Iconography', desc: 'Understanding how to represent deities, postures, and sacred symbols accurately.' },
                { icon: '📚', title: 'Art History & Tradition', desc: 'The context of Indian devotional painting — from the Pahari style to contemporary practice.' },
                { icon: '✍️', title: 'Composition & Storytelling', desc: 'How to compose a scene from scripture and bring it to life with emotion and clarity.' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '1.5rem', background: 'var(--warm-white)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Have a specific request?{' '}
              <a href="/contact" style={{ color: 'var(--rust)', fontWeight: 500 }}>Contact Sarvesh directly →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
