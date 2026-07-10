import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

export default function CartPanel() {
  const {
    cart, cartOpen, closeCart,
    removeFromCart, openCheckout,
    getSubtotal, getDiscount, getTotal,
  } = useStore();

  const subtotal  = getSubtotal();
  const discount  = getDiscount();
  const total     = getTotal();
  const origCount = cart.filter((c) => !c.isPrint).length;

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? ' open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className={`cart-panel${cartOpen ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-panel-head">
          <h2 className="cart-panel-title">Your Cart</h2>
          <button className="close-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        {/* Items list */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍</div>
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '0.82rem', marginTop: '0.4rem' }}>
                Browse the gallery to find a piece you love.
              </p>
              <button
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '1.25rem' }}
                onClick={closeCart}
              >
                Explore Gallery
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.cartKey}>
                {/* Thumbnail */}
                <div
                  className="cart-item-img"
                  style={{
                    background: `linear-gradient(145deg, ${item.color}33, ${item.color}66)`,
                    fontSize: '1.8rem',
                  }}
                  aria-hidden="true"
                >
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="cart-item-info">
                  <div className="cart-item-cat">
                    {item.isPrint ? `Art Print · ${item.category}` : `Original · ${item.category}`}
                  </div>
                  <div className="cart-item-title">{item.title}</div>

                  {/* Print: show type + size */}
                  {item.isPrint && item.printType && item.printSize && (
                    <div className="cart-item-meta" style={{ color: 'var(--rust)', fontWeight: 500 }}>
                      {item.printType.label} · {item.printSize.label}
                    </div>
                  )}

                  {/* Original: show dimensions */}
                  {!item.isPrint && (
                    <div className="cart-item-meta">{item.dimensions}</div>
                  )}

                  <div className="cart-item-price">
                    ₹{item.unitPrice.toLocaleString('en-IN')}
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.cartKey)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        {cart.length > 0 && (
          <div className="cart-foot">

            {/* Nudge: not yet at 3 originals */}
            {origCount > 0 && origCount < 3 && (
              <div
                className="cart-discount-note"
                style={{ background: '#FFF8E1', border: '1px solid #FFE082', color: '#7B5800' }}
              >
                🎨 Add <strong>{3 - origCount} more original{3 - origCount > 1 ? 's' : ''}</strong> to unlock <strong>10% off</strong>!
              </div>
            )}

            {/* Discount applied */}
            {origCount >= 3 && discount > 0 && (
              <div className="cart-discount-note">
                🎉 10% discount applied — you save ₹{discount.toLocaleString('en-IN')}!
              </div>
            )}

            <div className="cart-subtotal-row">
              <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div className="cart-discount-row">
                <span>10% Discount (3+ originals)</span>
                <span>−₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="cart-subtotal-row">
              <span>Shipping</span>
              <span style={{ color: '#2E7D32', fontWeight: 500 }}>Free (India)</span>
            </div>

            <div className="cart-total-row">
              <span>Total</span>
              <span className="price">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: '1rem' }}
              onClick={openCheckout}
            >
              Proceed to Checkout
            </button>

            <Link
              to="/wishlist"
              onClick={closeCart}
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              View Wishlist →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
