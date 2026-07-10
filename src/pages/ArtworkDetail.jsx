import { useParams, useNavigate, Link } from 'react-router-dom';
import { artworks, WHATSAPP_URL } from '../data/artworks';
import useStore from '../store/useStore';
import { useToast } from '../context/ToastContext';
import ArtworkCard from '../components/ArtworkCard';

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, openCheckout } = useStore();
  const toast = useToast();

  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Artwork not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/paintings-for-sale')}>← Back to Gallery</button>
      </div>
    );
  }

  const wishlisted = isWishlisted(artwork.id);

  const handleCart = () => {
    if (!artwork.available) { toast('This artwork is not available'); return; }
    const added = addToCart(artwork, false);
    toast(added ? `"${artwork.title}" added to cart` : 'Already in your cart');
  };

  const handleBuyNow = () => {
    if (!artwork.available) { toast('This artwork is not available'); return; }
    addToCart(artwork, false);
    openCheckout();
  };

  const related = artworks.filter((a) => a.id !== artwork.id && a.category === artwork.category).slice(0, 3);

  const specs = [
    { label: 'Medium',    val: artwork.medium },
    { label: 'Dimensions',val: artwork.dimensions },
    { label: 'Year',      val: artwork.year },
    { label: 'Category',  val: artwork.category },
    { label: 'Certificate', val: 'Signed by Artist' },
    { label: 'Shipping',  val: 'Free · Pan India' },
  ];

  return (
    <>
      <section className="section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
            <Link to="/">Home</Link><span>/</span>
            <Link to="/paintings-for-sale">Paintings for Sale</Link><span>/</span>
            <span>{artwork.title}</span>
          </nav>

          <div className="detail-layout">
            {/* Left – Image */}
            <div>
              <div
                className="detail-img-main"
                style={{ background: `linear-gradient(145deg, ${artwork.color}33, ${artwork.color}77)`, fontSize: '7rem' }}
                role="img"
                aria-label={`Painting: ${artwork.title}`}
              >
                {artwork.emoji}
              </div>
              <div className="detail-thumbs" aria-label="Additional views">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`detail-thumb${n === 1 ? ' active' : ''}`}
                    style={{ background: `linear-gradient(145deg, ${artwork.color}22, ${artwork.color}55)`, fontSize: '1.4rem' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${n}`}
                  >
                    {artwork.emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Info */}
            <div className="detail-info">
              <p className="detail-cat" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem', fontWeight: 600 }}>
                {artwork.category}
              </p>
              <h1 className="detail-title">{artwork.title}</h1>
              <p className="detail-price">₹{artwork.price.toLocaleString('en-IN')}</p>

              <span className={`detail-badge ${artwork.available ? 'available' : 'sold'}`}>
                {artwork.available ? '● Available for Purchase' : '● Sold'}
              </span>

              <p className="detail-desc">{artwork.description}</p>

              <div className="detail-specs" role="table" aria-label="Artwork specifications">
                {specs.map((s) => (
                  <div className="spec-item" key={s.label} role="row">
                    <div className="spec-label" role="rowheader">{s.label}</div>
                    <div className="spec-val" role="cell">{s.val}</div>
                  </div>
                ))}
              </div>

              {artwork.available ? (
                <div className="detail-actions">
                  <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleBuyNow}>
                    Buy Now
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleCart}>
                    Add to Cart
                  </button>
                  <button
                    className={`btn${wishlisted ? ' btn-dark' : ' btn-secondary'}`}
                    onClick={() => { toggleWishlist(artwork.id); toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    title="Wishlist"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    {wishlisted ? '♥' : '♡'}
                  </button>
                </div>
              ) : (
                <div style={{ margin: '1.25rem 0' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    This original has been sold. You can commission a similar work directly from Sarvesh.
                  </p>
                  <a
                    href={`https://wa.me/917558411657?text=Hi%20Sarvesh%2C%20I'm%20interested%20in%20a%20painting%20similar%20to%20"${encodeURIComponent(artwork.title)}"`}
                    target="_blank" rel="noreferrer"
                    className="btn btn-whatsapp"
                  >
                    💬 Commission a Similar Painting
                  </a>
                </div>
              )}

              <ul className="detail-note" style={{ listStyle: 'none', marginTop: '1.25rem' }}>
                <li>Certificate of Authenticity signed by Sarvesh Dalvi</li>
                <li>Insured, gallery-grade packaging</li>
                <li>Free delivery across India · International shipping available</li>
                <li>Pay via Razorpay, Stripe, or PayPal</li>
              </ul>

              {/* Also available as print */}
              {/* <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                🖼 Also available as a <Link to={`/prints/${artwork.id}`} style={{ color: 'var(--rust)', fontWeight: 500 }}>high-quality print</Link> from ₹{artwork.printPrice.toLocaleString('en-IN')}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Related works */}
      {related.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }} aria-labelledby="related-heading">
          <div className="container">
            <div className="section-header">
              <p className="section-tag">You May Also Like</p>
              <h2 className="section-title" id="related-heading">Related <em>Works</em></h2>
              <div className="divider" />
            </div>
            <div className="gallery-grid">
              {related.map((art) => <ArtworkCard key={art.id} artwork={art} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
