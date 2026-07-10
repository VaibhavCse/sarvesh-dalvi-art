import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { artworks, CATEGORIES_PRINTS, PRINT_TYPES, getAvailableSizes } from '../data/artworks';
import useStore from '../store/useStore';
import { useToast } from '../context/ToastContext';

/* ─────────────────────────────────────────────────────────
   PRICING CHART  — always visible, no interaction needed
───────────────────────────────────────────────────────── */
function PrintPricingChart() {
  return (
    <div style={{
      background: 'var(--warm-white)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '2.5rem',
    }}>
      <div style={{
        background: 'var(--parchment)',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <span style={{ fontSize: '1.2rem' }}>🖼</span>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 500 }}>
            Prices for Print
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            All prints on archival canvas · Free delivery pan India
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {PRINT_TYPES.map((type, ti) => (
          <div key={type.id} style={{ padding: '1.25rem 1.5rem', borderRight: ti === 0 ? '1px solid var(--border)' : 'none' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '0.3rem' }}>
              {type.label}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.4 }}>
              {type.desc}
            </p>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0.4rem 0.7rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderBottom: 'none', borderRadius: '4px 4px 0 0' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Size</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', textAlign: 'right' }}>Price (INR)</span>
            </div>
            {type.sizes.map((s, si) => (
              <div key={s.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                padding: '0.5rem 0.7rem',
                border: '1px solid var(--border)', borderTop: 'none',
                borderRadius: si === type.sizes.length - 1 ? '0 0 4px 4px' : '0',
                background: si % 2 === 0 ? 'var(--warm-white)' : 'var(--cream)',
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--rust)', fontFamily: "'Playfair Display', serif", fontWeight: 500, textAlign: 'right' }}>
                  ₹{s.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SHARED SIZE SELECTOR UI
   Used in both modal and detail page
───────────────────────────────────────────────────────── */
function TypeAndSizeSelector({ artwork, typeId, sizeId, onTypeChange, onSizeChange }) {
  return (
    <>
      {/* Step 1 — Type */}
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '0.7rem' }}>
        1 · Choose Print Type
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {PRINT_TYPES.map((type) => {
          const sizesForType = getAvailableSizes(type.id, artwork.availablePrintSizes);
          const disabled = sizesForType.length === 0;
          return (
            <button
              key={type.id}
              onClick={() => !disabled && onTypeChange(type.id)}
              disabled={disabled}
              style={{
                padding: '0.85rem 1rem',
                border: `1.5px solid ${typeId === type.id ? 'var(--rust)' : disabled ? 'var(--border-soft)' : 'var(--border)'}`,
                borderRadius: '6px',
                background: typeId === type.id ? 'var(--rust-pale)' : disabled ? 'var(--border-soft)' : 'var(--cream)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
                opacity: disabled ? 0.45 : 1,
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: typeId === type.id ? 'var(--rust)' : 'var(--text-dark)', display: 'block', marginBottom: '0.2rem' }}>
                {type.label}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {disabled ? 'Not available' : type.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step 2 — Size */}
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '0.7rem' }}>
        2 · Choose Size
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Show ALL sizes for the chosen type, but disable unavailable ones */}
        {PRINT_TYPES.find((t) => t.id === typeId).sizes.map((s, i) => {
          const available = getAvailableSizes(typeId, artwork.availablePrintSizes).some((as) => as.id === s.id);
          const isSelected = sizeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => available && onSizeChange(s.id)}
              disabled={!available}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                border: `1.5px solid ${isSelected ? 'var(--rust)' : !available ? 'var(--border-soft)' : 'var(--border)'}`,
                borderRadius: '6px',
                background: isSelected ? 'var(--rust-pale)' : !available ? 'var(--border-soft)' : 'var(--cream)',
                cursor: available ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: available ? 1 : 0.4,
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Visual size box */}
                <div style={{
                  width: `${14 + i * 5}px`,
                  height: `${18 + i * 6}px`,
                  border: `1.5px solid ${isSelected ? 'var(--rust)' : 'var(--text-muted)'}`,
                  borderRadius: '2px', flexShrink: 0, opacity: 0.65,
                }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: isSelected ? 'var(--rust)' : 'var(--text-dark)' }}>
                  {s.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {!available && (
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Not available
                  </span>
                )}
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: isSelected ? 'var(--rust)' : available ? 'var(--text-dark)' : 'var(--text-muted)', fontWeight: 500 }}>
                  ₹{s.price.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   SIZE PICKER MODAL
───────────────────────────────────────────────────────── */
function SizePickerModal({ artwork, onClose }) {
  // Default to first type that has available sizes
  const defaultType = PRINT_TYPES.find((t) => getAvailableSizes(t.id, artwork.availablePrintSizes).length > 0);
  const defaultSize = defaultType ? getAvailableSizes(defaultType.id, artwork.availablePrintSizes)[0] : null;

  const [typeId, setTypeId] = useState(defaultType?.id ?? PRINT_TYPES[0].id);
  const [sizeId, setSizeId] = useState(defaultSize?.id ?? PRINT_TYPES[0].sizes[0].id);

  const { addToCart, openCheckout } = useStore();
  const toast = useToast();

  const chosenType = PRINT_TYPES.find((t) => t.id === typeId);
  const chosenSize = chosenType.sizes.find((s) => s.id === sizeId);

  const handleTypeChange = (newTypeId) => {
    setTypeId(newTypeId);
    const available = getAvailableSizes(newTypeId, artwork.availablePrintSizes);
    if (available.length > 0 && !available.find((s) => s.id === sizeId)) {
      setSizeId(available[0].id);
    }
  };

  const doAdd = () => {
    const added = addToCart(
      { ...artwork, printPrice: chosenSize.price, printSize: chosenSize, printType: chosenType },
      true,
      `${typeId}-${sizeId}`,
    );
    toast(added
      ? `"${artwork.title}" (${chosenType.label}, ${chosenSize.label}) added to cart`
      : 'This size is already in your cart');
    onClose();
  };

  const doBuyNow = () => {
    addToCart(
      { ...artwork, printPrice: chosenSize.price, printSize: chosenSize, printType: chosenType },
      true,
      `${typeId}-${sizeId}`,
    );
    onClose();
    openCheckout();
  };

  // Check if current selection is actually available
  const currentSizeAvailable = getAvailableSizes(typeId, artwork.availablePrintSizes).some((s) => s.id === sizeId);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(28,20,16,0.6)', zIndex: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
      onClick={onClose}
    >
      <div
        style={{ background: 'var(--warm-white)', borderRadius: '12px', width: '100%', maxWidth: '460px', padding: '2rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }} aria-label="Close">✕</button>

        {/* Artwork header */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: '60px', height: '72px', borderRadius: '6px', flexShrink: 0, background: `linear-gradient(145deg, ${artwork.color}33, ${artwork.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid var(--border)' }}>
            {artwork.emoji}
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '0.2rem' }}>
              Art Print · {artwork.category}
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.3 }}>
              {artwork.title}
            </p>
          </div>
        </div>

        <TypeAndSizeSelector
          artwork={artwork}
          typeId={typeId}
          sizeId={sizeId}
          onTypeChange={handleTypeChange}
          onSizeChange={setSizeId}
        />

        {/* Summary */}
        <div style={{ background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.85rem 1rem', margin: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)', fontWeight: 500, display: 'block' }}>
              {chosenType.label} · {chosenSize.label}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Free delivery pan India</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: 'var(--rust)', fontWeight: 500 }}>
            ₹{chosenSize.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={doBuyNow} disabled={!currentSizeAvailable}>Buy Now</button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={doAdd} disabled={!currentSizeAvailable}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PRINT CARD
───────────────────────────────────────────────────────── */
function PrintCard({ artwork }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const navigate  = useNavigate();

  // cheapest available size across all types
  const allAvailSizes = getAvailableSizes('rolled', artwork.availablePrintSizes);
  const fromPrice = allAvailSizes.length > 0 ? allAvailSizes[0].price : PRINT_TYPES[1].sizes[0].price;

  // for the visual strip, show all 4 sizes but dim unavailable ones
  const allSizes    = PRINT_TYPES[0].sizes;
  const availIds    = artwork.availablePrintSizes ?? allSizes.map((s) => s.id);

  return (
    <>
      <article
        className="artwork-card"
        onClick={() => navigate(`/prints/${artwork.id}`)}
        role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/prints/${artwork.id}`)}
        aria-label={`View print: ${artwork.title}`}
      >
        <div className="card-img-wrap">
          <div className="card-img" style={{ background: `linear-gradient(145deg, ${artwork.color}33, ${artwork.color}88)`, fontSize: '3.5rem' }} aria-hidden="true">
            {artwork.emoji}
          </div>
          <div className="card-overlay" aria-hidden="true" />
          <span className="card-tag">Print</span>
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-primary btn-sm"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={(e) => { e.stopPropagation(); setPickerOpen(true); }}
            >
              Select Size & Order
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="card-category">{artwork.category}</div>
          <h3 className="card-title">{artwork.title}</h3>
          <p className="card-meta">{artwork.medium} · {artwork.year}</p>

          {/* Size strip — available sizes solid, unavailable greyed */}
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-soft)', alignItems: 'flex-end' }}>
            {allSizes.map((s, i) => {
              const isAvail = availIds.includes(s.id);
              return (
                <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', flex: 1 }}>
                  <div style={{
                    width: `${10 + i * 4}px`,
                    height: `${13 + i * 5}px`,
                    border: `1.5px solid ${isAvail ? 'var(--rust)' : 'var(--border)'}`,
                    borderRadius: '2px',
                    opacity: isAvail ? 0.75 : 0.25,
                    background: isAvail ? 'var(--rust-pale)' : 'transparent',
                  }} />
                  <span style={{ fontSize: '0.55rem', color: isAvail ? 'var(--text-mid)' : 'var(--border)', textAlign: 'center', lineHeight: 1.2 }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="card-price-row" style={{ marginTop: '0.6rem' }}>
            <span className="card-price">From ₹{fromPrice.toLocaleString('en-IN')}</span>
            <span className="card-avail yes">Available</span>
          </div>
        </div>
      </article>

      {pickerOpen && <SizePickerModal artwork={artwork} onClose={() => setPickerOpen(false)} />}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   PRINTS LISTING PAGE
───────────────────────────────────────────────────────── */
export function PrintsPage() {
  const [filter, setFilter] = useState('All Prints');
  const [search, setSearch]  = useState('');

  const filtered = artworks.filter((a) => {
    const matchCat = filter === 'All Prints' || a.category === filter;
    const matchQ   = !search || a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Art Prints</p>
        <h1>High-Quality <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Prints</em></h1>
        <p>Stretched & rolled canvas prints of Sarvesh's original works. From ₹2,400.</p>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span>/</span><span>Prints</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="prints-note">
            <span className="prints-note-icon">🖼</span>
            <span>
              Prints are canvas reproductions — <strong>Stretched</strong> (ready to hang) or{' '}
              <strong>Rolled</strong> (frame separately). Not original paintings. Originals on the{' '}
              <Link to="/paintings-for-sale" style={{ color: 'var(--rust)' }}>Paintings for Sale</Link> page.
              Available sizes vary per artwork.
            </span>
          </div>

          <PrintPricingChart />

          <div className="filter-bar">
            {CATEGORIES_PRINTS.map((cat) => (
              <button key={cat} className={`filter-btn${filter === cat ? ' active' : ''}`} onClick={() => setFilter(cat)}>
                {cat}
              </button>
            ))}
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" type="search" placeholder="Search prints…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search prints" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🖼</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }}>No prints found</h3>
            </div>
          ) : (
            <div className="gallery-grid">
              {filtered.map((art) => <PrintCard key={art.id} artwork={art} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   PRINT DETAIL PAGE
───────────────────────────────────────────────────────── */
export function PrintDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { addToCart, openCheckout } = useStore();
  const toast    = useToast();

  const artwork = artworks.find((a) => a.id === id);

  // Default to first available type + size
  const defaultType = PRINT_TYPES.find((t) => getAvailableSizes(t.id, artwork?.availablePrintSizes).length > 0);
  const defaultSize = defaultType ? getAvailableSizes(defaultType.id, artwork?.availablePrintSizes)[0] : null;

  const [typeId, setTypeId] = useState(defaultType?.id ?? PRINT_TYPES[0].id);
  const [sizeId, setSizeId] = useState(defaultSize?.id ?? PRINT_TYPES[0].sizes[0].id);

  if (!artwork) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Print not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/prints')}>← Back to Prints</button>
      </div>
    );
  }

  const chosenType = PRINT_TYPES.find((t) => t.id === typeId);
  const chosenSize = chosenType.sizes.find((s) => s.id === sizeId);
  const currentSizeAvailable = getAvailableSizes(typeId, artwork.availablePrintSizes).some((s) => s.id === sizeId);

  const handleTypeChange = (newTypeId) => {
    setTypeId(newTypeId);
    const available = getAvailableSizes(newTypeId, artwork.availablePrintSizes);
    if (available.length > 0 && !available.find((s) => s.id === sizeId)) setSizeId(available[0].id);
  };

  const handleCart = () => {
    if (!currentSizeAvailable) return;
    const added = addToCart(
      { ...artwork, printPrice: chosenSize.price, printSize: chosenSize, printType: chosenType },
      true, `${typeId}-${sizeId}`,
    );
    toast(added ? `"${artwork.title}" (${chosenType.label}, ${chosenSize.label}) added to cart` : 'Already in your cart');
  };

  const handleBuyNow = () => {
    if (!currentSizeAvailable) return;
    addToCart({ ...artwork, printPrice: chosenSize.price, printSize: chosenSize, printType: chosenType }, true, `${typeId}-${sizeId}`);
    openCheckout();
  };

  const specs = [
    { label: 'Type',          val: chosenType.label },
    { label: 'Selected Size', val: currentSizeAvailable ? chosenSize.label : 'Select an available size' },
    { label: 'Original',      val: artwork.medium },
    { label: 'Year',          val: artwork.year },
    { label: 'Shipping',      val: 'Free · Pan India' },
    { label: 'International', val: 'Available' },
  ];

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
          <Link to="/">Home</Link><span>/</span>
          <Link to="/prints">Prints</Link><span>/</span>
          <span>{artwork.title}</span>
        </nav>

        <div className="detail-layout">
          <div>
            <div className="detail-img-main" style={{ background: `linear-gradient(145deg, ${artwork.color}33, ${artwork.color}77)`, fontSize: '7rem' }} role="img" aria-label={`Print: ${artwork.title}`}>
              {artwork.emoji}
            </div>
          </div>

          <div className="detail-info">
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem', fontWeight: 600 }}>
              Art Print · {artwork.category}
            </p>
            <h1 className="detail-title">{artwork.title}</h1>

            {/* Live price — only show if selection is valid */}
            <p className="detail-price">
              {currentSizeAvailable
                ? `₹${chosenSize.price.toLocaleString('en-IN')}`
                : 'Select an available size'}
            </p>
            <span className="detail-badge available">● Available</span>
            <p className="detail-desc">{artwork.description}</p>

            <TypeAndSizeSelector
              artwork={artwork}
              typeId={typeId}
              sizeId={sizeId}
              onTypeChange={handleTypeChange}
              onSizeChange={setSizeId}
            />

            <div className="detail-specs" style={{ marginTop: '1.5rem' }}>
              {specs.map((s) => (
                <div className="spec-item" key={s.label}>
                  <div className="spec-label">{s.label}</div>
                  <div className="spec-val">{s.val}</div>
                </div>
              ))}
            </div>

            <div className="detail-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleBuyNow} disabled={!currentSizeAvailable}>
                {currentSizeAvailable ? `Buy Now — ₹${chosenSize.price.toLocaleString('en-IN')}` : 'Select an available size'}
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleCart} disabled={!currentSizeAvailable}>
                Add to Cart
              </button>
            </div>

            <ul className="detail-note" style={{ listStyle: 'none', marginTop: '1.25rem' }}>
              <li>Premium archival canvas print</li>
              <li>Artist-approved quality</li>
              <li>Free delivery pan India · International available</li>
              <li>Framing not included unless specified</li>
            </ul>

            <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
              🎨 Want the original?{' '}
              <Link to={`/artwork/${artwork.id}`} style={{ color: 'var(--rust)', fontWeight: 500 }}>View original painting</Link>
              {' '}— ₹{artwork.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)', fontWeight: 600, marginBottom: '1rem' }}>
            Full Pricing Reference
          </p>
          <PrintPricingChart />
        </div>
      </div>
    </section>
  );
}