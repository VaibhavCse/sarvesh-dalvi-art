import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { useToast } from '../context/ToastContext';

export default function ArtworkCard({ artwork, isPrint = false }) {
  const navigate   = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const toast      = useToast();
  const wishlisted = isWishlisted(artwork.id);

  const handleCart = (e) => {
    e.stopPropagation();
    if (!artwork.available) { toast('This artwork is currently unavailable'); return; }
    const added = addToCart(artwork, isPrint);
    toast(added ? `"${artwork.title}" added to cart` : 'Already in your cart');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(artwork.id);
    toast(isWishlisted(artwork.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const displayPrice = isPrint ? artwork.printPrice : artwork.price;
  const detailPath   = isPrint ? `/prints/${artwork.id}` : `/artwork/${artwork.id}`;

  return (
    <article
      className="artwork-card"
      onClick={() => navigate(detailPath)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(detailPath)}
      aria-label={`View ${artwork.title}`}
    >
      <div className="card-img-wrap">
        {/* Placeholder — replace src with artwork.imageUrl when available */}
        <div
          className="card-img"
          style={{ background: `linear-gradient(145deg, ${artwork.color}33, ${artwork.color}88)`, fontSize: '3.5rem' }}
          aria-hidden="true"
        >
          {artwork.emoji}
        </div>

        <div className="card-overlay" aria-hidden="true" />

        {/* Available / Sold badge */}
        <span className={`card-tag${artwork.available ? '' : ' sold'}`}>
          {artwork.available ? (isPrint ? 'Print' : 'Original') : 'Sold'}
        </span>

        {/* Wishlist button */}
        <button
          className={`card-wishlist-btn${wishlisted ? ' active' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          {wishlisted ? '♥' : '♡'}
        </button>

        {/* Hover actions */}
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-primary btn-sm"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={handleCart}
            disabled={!artwork.available}
          >
            {artwork.available ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="card-category">{artwork.category}</div>
        <h3 className="card-title">{artwork.title}</h3>
        <p className="card-meta">{artwork.medium} · {artwork.year}</p>
        <div className="card-price-row">
          <span className="card-price">₹{displayPrice.toLocaleString('en-IN')}</span>
          <span className={`card-avail${artwork.available ? ' yes' : ' sold'}`}>
            {artwork.available ? 'Available' : 'Sold'}
          </span>
        </div>
      </div>
    </article>
  );
}
