import { useNavigate } from 'react-router-dom';
import sarveshImg      from '../images/our_story/artist.jpg';
import certificateImg  from '../images/our_story/Certificate_sarvesh.jpg';
import iitImg          from '../images/our_story/IIT_Judge.jpg';

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

          {/* ── MAIN STORY ── */}
          <div className="two-col">
            <div className="img-frame-wrapper">
              <img
                src={sarveshImg}
                alt="Sarvesh Dalvi — Artist"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                  border: '1px solid var(--border)',
                }}
              />
              {/* <div className="img-frame-accent"  aria-hidden="true" />
              <div className="img-frame-accent2" aria-hidden="true" /> */}
            </div>

            <div className="text-content">
              <p className="section-tag">Sarvesh Subhash Dalvi</p>
              <h2 className="section-title">Painting the <em>Sacred</em></h2>
              <div className="divider" />

              <div className="blockquote">
                <p>"The divine has always been my teacher. I just try to listen closely enough to paint what I hear."</p>
              </div>

              <p>My artistic journey began in 2020 during the COVID-19 lockdown while I was pursuing my engineering degree. What started as a way to spend my time soon became my true passion — I began with simple graphite pencil sketches, spending countless hours learning the fundamentals of drawing, shading, and observation.</p>

              <p>After two years of dedicated practice, I transitioned to colour pencil art, exploring realism and developing a deeper understanding of texture and detail. In 2024, I discovered my true calling in oil painting — its richness and timeless depth opened an entirely new world of creative possibilities.</p>

              <p>I found myself deeply drawn to Indian mythology, and since then I have devoted my work to creating large-scale paintings that combine ancient stories with my own artistic vision. For me, mythology is more than a subject — it is a source of inspiration, imagination, and spiritual connection.</p>

              <p>As a self-taught artist, my journey has been built on curiosity, patience, and continuous learning. Every painting reflects not only my skills but also my passion for storytelling, culture, and the timeless beauty of Indian mythology.</p>

              <div className="stats-grid" style={{ marginTop: '2rem' }}>
                {[
                  { num: '30+',  label: 'Original Works'        },
                  { num: '200+', label: 'Collectors Worldwide'  },
                  { num: '5+',   label: 'Years Creating'        },
                  { num: '2',    label: 'National Recognitions' },
                ].map((s) => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PHILOSOPHY ── */}
          <div style={{
            marginTop: '5rem', padding: '3.5rem',
            background: 'var(--parchment)', border: '1px solid var(--border)',
            borderRadius: '12px', textAlign: 'center',
          }}>
            <p className="section-tag" style={{ marginBottom: '1rem' }}>The Philosophy</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '1.25rem' }}>
              Art as <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Devotion</em>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.85 }}>
              "I do not paint to create beautiful objects. I paint to create spaces for the sacred to breathe.
              When someone hangs one of my works in their home, I hope they feel — even for a moment —
              that the divine is present. That is the only measure of success I know."
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--rust)', marginTop: '1.25rem', fontWeight: 500 }}>
              — Sarvesh Dalvi
            </p>
          </div>

          {/* ── RECOGNITIONS ── */}
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <p className="section-tag">Recognitions & Achievements</p>
              <h2 className="section-title">Honoured for <em>Excellence</em></h2>
              <div className="divider" />
              <p className="section-desc">
                Sarvesh's dedication to devotional art has earned recognition at both national and institutional levels.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              {/* ── Kingdom World Records ── */}
              <div
                style={{
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#fff",
                    height: "650px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  <img
                    src={certificateImg}
                    alt="Kingdom World Records Certificate — Sarvesh Dalvi"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                      color: "#fff",
                      padding: "0.35rem 0.9rem",
                      borderRadius: "50px",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    ✦ World Record
                  </div>
                </div>

                <div style={{ padding: "1.75rem" }}>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--rust)",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Kingdom World Records · 2024
                  </p>

                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    The Luminary of Devotional Modern Painting
                  </h4>

                  <p
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    Officially recognised by Kingdom World Records for exceptional talent,
                    creativity, and dedication in creating devotional paintings infused
                    with a modern artistic touch. Sarvesh's unique ability to blend
                    tradition with contemporary expression stands as an inspiring
                    contribution to devotional art.
                  </p>
                </div>
              </div>

              {/* ── IIT Gandhinagar ── */}
              <div
                style={{
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#fff",
                    height: "650px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  <img
                    src={iitImg}
                    alt="IIT Gandhinagar Letter of Appreciation — Sarvesh Dalvi"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "linear-gradient(135deg, #1a3a6b, #2e5fad)",
                      color: "#fff",
                      padding: "0.35rem 0.9rem",
                      borderRadius: "50px",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    IIT Gandhinagar
                  </div>
                </div>

                <div style={{ padding: "1.75rem" }}>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--rust)",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
                    }}
                  >
                    IIT Gandhinagar · February 2026
                  </p>

                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.2rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Judge, Mirage Art Competition
                  </h4>

                  <p
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    Invited by the Indian Institute of Technology Gandhinagar to serve as a
                    judge for Mirage — their prestigious inter-college art competition held
                    in February 2026. It was a deeply rewarding experience to witness the
                    creativity and passion of young artists and contribute meaningful
                    feedback to the event.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── TIMELINE ── */}
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <p className="section-tag">Journey</p>
              <h2 className="section-title">Milestones & <em>Exhibitions</em></h2>
              <div className="divider" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                { year: '2026', title: 'Judge — IIT Gandhinagar', desc: 'Invited as a judge for Mirage, the prestigious art competition at IIT Gandhinagar, recognising his expertise and contribution to the art community.' },
                { year: '2024', title: 'Kingdom World Records', desc: 'Officially recognised as "The Luminary of Devotional Modern Painting" for exceptional talent and contribution to devotional art.' },
                { year: '2024', title: 'Instagram Solo Exhibition', desc: 'A digital showcase of 30+ original mythological and devotional works, reaching collectors across India and globally.' },
                // { year: '2024', title: 'Ram Vivah Series', desc: 'A multi-painting series depicting the sacred marriage of Lord Ram and Sita, widely collected across India.' },
                // { year: '2023', title: 'Mahabharat Collection', desc: 'A 12-part epic narrative series depicting key scenes and characters from the Mahabharata.' },
                { year: 'Ongoing', title: 'Private Commissions', desc: 'Custom devotional works for collectors, families, and sacred spaces across India and internationally.' },
              ].map((m) => (
                <div key={m.title} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--warm-white)' }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    {m.year}
                  </div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', marginBottom: '1.5rem' }}>
              Explore Sarvesh's work or start a conversation about a commission.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/paintings-for-sale')}>
                Browse Originals
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/commission')}>
                Commission a Work
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
