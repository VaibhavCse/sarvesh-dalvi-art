import { useNavigate, Link } from 'react-router-dom';
import { artworks, WHATSAPP_URL } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';
import Hero from "../images/home/home.jpeg";
import artist from "../images/our_story/artist.jpg";
import Custom from "../images/home/custom.png";

const MARQUEE = ['Hanuman', 'Ram Vivah', 'Radha Krishna', 'Lord Shiva', 'Buddha', 'Mahabharata', 'Divine Weddings', 'Oil Paintings'];

const TESTIMONIALS = [
  { text: 'The Ram Vivah painting transformed our prayer room. The detail and devotion in every stroke is breathtaking.', name: 'Priya Sharma', loc: 'Mumbai', initials: 'PS' },
  { text: "Sarvesh's Hanuman painting has an energy that fills the entire room. Worth every rupee and more.", name: 'Rajan Mehta', loc: 'Pune', initials: 'RM' },
  { text: 'We commissioned a custom Shiva painting for our new home. The result exceeded our wildest expectations.', name: 'Anita Rao', loc: 'Bengaluru', initials: 'AR' },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = artworks.filter((a) => a.available).slice(0, 6);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero-inner">
          <div>
            <p className="hero-eyebrow">Original Indian Oil Paintings</p>
            <h1 className="hero-title">
              Sacred Stories,<br /><em>Painted in Oil</em>
            </h1>
            <p className="hero-desc">
              Original mythological and devotional oil paintings by artist Sarvesh Dalvi.
              Each canvas is a unique original — crafted with patience, rooted in faith.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/paintings-for-sale')}>
                Shop Originals
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/commission')}>
                Commission a Painting
              </button>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item"><span>✓</span><span>Free Delivery Pan India</span></div>
              <div className="hero-trust-item"><span>✓</span><span>Certificate of Authenticity</span></div>
              <div className="hero-trust-item"><span>✓</span><span>10% off on 3+ originals</span></div>
            </div>
          </div>

          <div className="hero-img-wrap">
            <img
              src={Hero}
              alt="Featured Artwork"
              className="hero-img-frame"
              style={{
                width: "100%",
                height: "650px",
                objectFit: "cover",
                borderRadius: "16px",
                display: "block",
                border: "1px solid var(--border)"
              }}
            />

            <div className="hero-img-accent" aria-hidden="true" />

            <div className="hero-tag">
              <strong>30+</strong> Original Works
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <div className="feature-strip">
        <div className="feature-strip-inner">
          {[
            { icon: '🚚', title: 'Free Delivery Pan India', sub: 'On all original artworks' },
            { icon: '🌍', title: 'Global Shipping', sub: 'We ship worldwide' },
            { icon: '📜', title: 'Certificate of Authenticity', sub: 'Signed by the artist' },
            { icon: '🎨', title: '10% Off on 3+ Originals', sub: 'Automatically applied' },
          ].map((f) => (
            <div className="feature-item" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-text">
                <strong>{f.title}</strong>
                <span>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED WORKS ── */}
      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Featured Works</p>
            <h2 className="section-title" id="featured-heading">Sacred <em>Originals</em></h2>
            <div className="divider" />
            <p className="section-desc">Each painting is a unique original — hand-crafted in oil, signed by Sarvesh, and available for your home or sacred space.</p>
          </div>
          <div className="gallery-grid">
            {featured.map((art) => <ArtworkCard key={art.id} artwork={art} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/paintings-for-sale')}>
              View All Paintings →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section" style={{ background: 'var(--parchment)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} aria-labelledby="about-heading">
        <div className="container">
          <div className="two-col">
            <div className="img-frame-wrapper">
              <img
                src={artist}
                alt="Sarvesh Dalvi"
                className="img-frame"
                style={{
                  width: "100%",
                  height: "460px",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "12px",
                  display: "block",
                  border: "1px solid var(--border)"
                }}
              />

              <div className="img-frame-accent" aria-hidden="true" />
              <div className="img-frame-accent2" aria-hidden="true" />
            </div>
            <div className="text-content">
              <p className="section-tag">The Artist</p>
              <h2 className="section-title" id="about-heading">Devotion <em>Rendered</em> in Oil</h2>
              <div className="divider" />
              <div className="blockquote">
                <p>"Each painting is a prayer — a conversation between my brush and the divine."</p>
              </div>
              <p>Sarvesh Dalvi is a contemporary Indian artist specialising in mythological and devotional oil paintings. Drawing from the Ramayana, Mahabharata, and Bhagavata Purana, his works carry the warmth of tradition and the precision of fine art.</p>
              <p>Each painting begins with study — hours of reading, prayer, and sketching before the first brushstroke touches canvas. The result is not just a painting, but a devotional artifact.</p>
              <div className="stats-grid" style={{ marginTop: '2rem' }}>
                {[
                  { num: '50+', label: 'Original Works' },
                  { num: '200+', label: 'Collectors' },
                  { num: '8+', label: 'Years Creating' },
                  { num: '12+', label: 'Exhibitions' },
                ].map((s) => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={() => navigate('/our-story')}>Read Full Story</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMISSION CTA ── */}
      <section className="section" aria-labelledby="commission-heading">
        <div className="container">
          <div className="two-col reverse">
            <div className="text-content">
              <p className="section-tag">Custom Commissions</p>
              <h2 className="section-title" id="commission-heading">Your Vision,<br /><em>His Brush</em></h2>
              <div className="divider" />
              <p>Have a specific deity, scene, or sacred story in mind? Sarvesh accepts a limited number of commissions each year — each crafted with the same devotion and precision as his original works.</p>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-mid)', fontSize: '0.9rem', lineHeight: 1.9, marginTop: '1rem', marginBottom: '1.75rem' }}>
                <li>Custom size — from 3/2 ft to 7.5/5 ft</li>
                <li>Inspired by temples, mythology, and devotional themes</li>
                <li>Certificate of Authenticity included</li>
                <li>Free delivery pan India</li>
              </ul>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('/commission')}>Learn More</button>
                <a href={`https://wa.me/917558411657?text=Hi%20Sarvesh%2C%20I'd%20like%20to%20commission%20a%20custom%20painting.`} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                  💬 WhatsApp Sarvesh
                </a>
              </div>
            </div>
            <div className="img-frame-wrapper">
              <img
                src={Custom}
                alt="Custom Commission Painting"
                className="img-frame"
                style={{
                  width: "100%",
                  height: "450px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "12px",
                  display: "block",
                  border: "1px solid var(--border)"
                }}
              />

              <div className="img-frame-accent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINTS CTA ── */}
      <section className="section" style={{ background: 'var(--parchment)', borderTop: '1px solid var(--border)' }} aria-labelledby="prints-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Art Prints</p>
          <h2 className="section-title" id="prints-heading">Bring the Sacred <em>Home</em></h2>
          <div className="divider center" />
          <p className="section-desc" style={{ margin: '0 auto 2rem' }}>
            High-quality reproductions of Sarvesh's original works, starting from ₹4,500. Perfect for gifting or bringing devotional art into any space.
          </p>
          <button className="btn btn-dark btn-lg" onClick={() => navigate('/prints')}>
            Browse Prints →
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header center">
            <p className="section-tag">Collector Stories</p>
            <h2 className="section-title" id="testimonials-heading">What Collectors <em>Say</em></h2>
            <div className="divider center" />
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-card" key={t.name}>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
