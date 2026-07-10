import { useState } from 'react';
import { artworks, CATEGORIES_ORIGINALS } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';

export default function PaintingsForSale() {
  const [filter, setFilter] = useState('All Works');
  const [search, setSearch] = useState('');

  const filtered = artworks.filter((a) => {
    const matchCat = filter === 'All Works' || a.category === filter;
    const matchQ   = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Original Works</p>
        <h1>Paintings for <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Sale</em></h1>
        <p>Hand-painted oil originals — each unique, signed, and accompanied by a Certificate of Authenticity.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Originals</span><span>/</span><span>Paintings for Sale</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="toolbar" aria-label="Filter artworks">
            {CATEGORIES_ORIGINALS.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                className="search-input"
                type="search"
                placeholder="Search paintings…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search paintings"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎨</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '0.4rem' }}>No results found</h3>
              <p style={{ fontSize: '0.85rem' }}>Try a different filter or search term</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Showing {filtered.length} work{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="gallery-grid">
                {filtered.map((art) => <ArtworkCard key={art.id} artwork={art} />)}
              </div>
            </>
          )}

          <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--rust)' }}>🎨 10% off on 3 or more originals</strong> · Free delivery pan India ·
            Certificate of Authenticity with every original · Sold artworks can be commissioned as custom works —
            <a href="/commission" style={{ color: 'var(--rust)', marginLeft: '0.25rem' }}>enquire here</a>
          </div>
        </div>
      </section>
    </>
  );
}
