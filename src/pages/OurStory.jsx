import { useNavigate } from 'react-router-dom';
import sarvesh from "../images/our_story/artist.jpg";

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Our Story</p>
        <h1>The Artist Behind <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>the Canvas</em></h1>
        <p>A life dedicated to devotion, detail, and the divine.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Our Story</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          {/* Main story */}
          <div className="two-col">
            <div className="img-frame-wrapper">
              <img
                src={sarvesh}
                alt="Sarvesh Dalvi"
                className="img-frame"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  display: "block",
                  border: "1px solid var(--border)"
                }}
              />

              <div className="img-frame-accent" aria-hidden="true" />
              <div className="img-frame-accent2" aria-hidden="true" />
            </div>
            <div className="text-content">
              <p className="section-tag">Sarvesh Dalvi</p>
              <h2 className="section-title">Painting the <em>Sacred</em></h2>
              <div className="divider" />
              <div className="blockquote">
                <p>"The divine has always been my teacher. I just try to listen closely enough to paint what I hear."</p>
              </div>
              <p>My artistic journey began in 2020 during the COVID-19 lockdown while I was pursuing my engineering degree. What started as a way to spend my time soon became my true passion. I began with simple graphite pencil sketches, spending countless hours learning the fundamentals of drawing, shading, and observation.</p>
              <p>After two years of dedicated practice, I transitioned to color pencil art, where I explored realism and developed a deeper understanding of color, texture, and detail. Every artwork helped me grow as a self-taught artist and strengthened my confidence in expressing emotions through art.</p>
              <p>In 2024, I discovered my true calling in oil painting. The richness, depth, and timeless nature of the medium opened a new world of creative possibilities. I found myself deeply drawn to Indian mythology, and since then, I have devoted my work to creating large-scale mythological paintings that combine traditional stories with my own artistic vision.</p>
              <p>For me, mythology is more than just a subject—it is a source of inspiration, imagination, and spiritual connection. Each painting allows me to breathe new life into ancient tales, portraying divine characters and sacred moments through my own perspective. These artworks give me complete creative freedom and have become an inseparable part of my life.</p>
              <p>As a self-taught artist, my journey has been built on curiosity, patience, and continuous learning. Every painting reflects not only my skills but also my passion for storytelling, culture, and the timeless beauty of Indian mythology.</p>
              <div className="stats-grid">
                {[
                  { num: '50+', label: 'Original Works' },
                  { num: '200+', label: 'Collectors Worldwide' },
                  { num: '8+', label: 'Years as an Artist' },
                  { num: '12+', label: 'Exhibitions' },
                ].map((s) => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div style={{ marginTop: '5rem', padding: '3.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <p className="section-tag" style={{ marginBottom: '1rem' }}>The Philosophy</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '1.25rem' }}>
              Art as <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Devotion</em>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.85 }}>
              "I do not paint to create beautiful objects. I paint to create spaces for the sacred to breathe. When someone hangs one of my works in their home, I hope they feel — even for a moment — that the divine is present. That is the only measure of success I know."
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--rust)', marginTop: '1.25rem', fontWeight: 500 }}>— Sarvesh Dalvi</p>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <p className="section-tag">Journey</p>
              <h2 className="section-title">Milestones & <em>Exhibitions</em></h2>
              <div className="divider" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                { year: '2024', title: 'Instagram Solo Exhibition', desc: 'A digital showcase of 30+ original mythological and devotional works, reaching collectors across India and globally.' },
                { year: '2024', title: 'Ram Vivah Series', desc: 'A multi-painting series depicting the sacred marriage of Lord Ram and Sita, widely collected across India.' },
                { year: '2023', title: 'Mahabharat Collection', desc: 'A 12-part epic narrative series depicting key scenes and characters from the Mahabharata.' },
                { year: '2022', title: 'Krishna Devotion Series', desc: 'Radha Krishna works in oil — among the most loved in Sarvesh\'s portfolio, several now in private collections.' },
                { year: '2021', title: 'Temple & Sacred Spaces', desc: 'Commissioned artworks for temples and sacred spaces across Maharashtra.' },
                { year: 'Ongoing', title: 'Private Commissions', desc: 'Custom devotional works for collectors, families, and sacred spaces across India and internationally.' },
              ].map((m) => (
                <div key={m.title} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--warm-white)' }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.4rem', fontWeight: 600 }}>{m.year}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: '0.4rem' }}>{m.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', marginBottom: '1.5rem' }}>
              Explore Sarvesh's work or start a conversation about a commission.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/paintings-for-sale')}>Browse Originals</button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/commission')}>Commission a Work</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
