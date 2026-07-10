import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Navbar() {
  const { cart, wishlist, toggleCart } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOrigOpen, setMobileOrigOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            Sarvesh <span>Art</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Home
              </NavLink>
            </li>

            {/* Originals dropdown */}
            <li className="nav-item">
              <button className="nav-link">
                Originals <span className="nav-arrow">▾</span>
              </button>
              <div className="nav-dropdown">
                <Link to="/commission" className="">Customize a Painting</Link>
                <div className="nav-dropdown-divider" />
                <Link to="/paintings-for-sale" className="">Paintings for Sale</Link>
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="/prints" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Prints
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/our-story" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Our Story
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Contact Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/workshop" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Workshop
              </NavLink>
            </li>
          </ul>

          {/* Right icons */}
          <div className="nav-right">
            <button
              className="nav-icon-btn"
              onClick={() => navigate('/wishlist')}
              title="Wishlist"
              aria-label="Wishlist"
            >
              ♡
              {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </button>

            <button
              className="nav-icon-btn"
              onClick={toggleCart}
              title="Cart"
              aria-label="Cart"
            >
              🛍
              {cart.length > 0 && <span className="nav-badge">{cart.length}</span>}
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>

        <button
          className="mobile-nav-link"
          style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--text-mid)', fontWeight: 500, padding: '0.65rem 0.5rem', borderBottom: '1px solid var(--border-soft)' }}
          onClick={() => setMobileOrigOpen((o) => !o)}
        >
          Originals {mobileOrigOpen ? '▴' : '▾'}
        </button>
        {mobileOrigOpen && (
          <>
            <Link to="/commission" className="mobile-sub-link" onClick={closeMobile}>Customize a Painting</Link>
            <Link to="/paintings-for-sale" className="mobile-sub-link" onClick={closeMobile}>Paintings for Sale</Link>
          </>
        )}

        <Link to="/prints" className="mobile-nav-link" onClick={closeMobile}>Prints</Link>
        <Link to="/our-story" className="mobile-nav-link" onClick={closeMobile}>Our Story</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={closeMobile}>Contact Us</Link>
        <Link to="/workshop" className="mobile-nav-link" onClick={closeMobile}>Workshop</Link>
        <Link to="/wishlist" className="mobile-nav-link" onClick={closeMobile}>Wishlist ({wishlist.length})</Link>
      </div>
    </>
  );
}
