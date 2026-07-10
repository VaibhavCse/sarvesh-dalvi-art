import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { artworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';

export default function Wishlist() {
  const { wishlist, toggleCart } = useStore();
  const navigate = useNavigate();

  const wishlistArtworks = artworks.filter((a) => wishlist.includes(a.id));

  return (
    <>
      <div className="page-banner">
        <p className="section-tag">Saved Works</p>
        <h1>Your <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>Wishlist</em></h1>
        <p>Artworks you've saved. Add them to your cart whenever you're ready.</p>
      </div>

      <section className="section">
        <div className="container">
          {wishlistArtworks.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">♡</div>
              <h2>Your wishlist is empty</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
                Browse the gallery and tap the ♡ on any artwork to save it here.
              </p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/paintings-for-sale')}>
                Browse Paintings
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {wishlistArtworks.length} saved artwork{wishlistArtworks.length > 1 ? 's' : ''}
                </p>
                <button className="btn btn-secondary btn-sm" onClick={toggleCart}>
                  View Cart →
                </button>
              </div>

              <div className="gallery-grid">
                {wishlistArtworks.map((art) => (
                  <ArtworkCard key={art.id} artwork={art} />
                ))}
              </div>

              {wishlistArtworks.filter((a) => a.available).length >= 3 && (
                <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '8px', fontSize: '0.88rem', color: '#2E7D32', textAlign: 'center' }}>
                  🎉 You have {wishlistArtworks.filter((a) => a.available).length} available artworks saved!
                  Add 3 or more originals to your cart to get <strong>10% off</strong>.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
