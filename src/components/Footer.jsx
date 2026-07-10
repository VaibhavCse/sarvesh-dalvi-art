import { Link, useNavigate } from 'react-router-dom';
import { WHATSAPP_URL } from '../data/artworks';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="footer-brand">Sarvesh <span>Art</span></div>
          <p className="footer-desc">
            Original Indian mythological and devotional oil paintings. Each work is a unique,
            authenticated original — a piece of living tradition to carry into your home.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/_sarveshdalvi_" target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="footer-col-title">Shop</p>
          <ul className="footer-links">
            <li><Link to="/paintings-for-sale">Paintings for Sale</Link></li>
            <li><Link to="/prints">Art Prints</Link></li>
            <li><Link to="/commission">Commission a Painting</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="footer-col-title">Information</p>
          <ul className="footer-links">
            <li><Link to="/our-story">Our Story</Link></li>
            <li><Link to="/workshop">Workshop</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="footer-col-title">Get in Touch</p>
          <ul className="footer-links">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp: +91 7558411657</a></li>
            <li><a href="mailto:Dalvisarvesh02292@gmail.com">Dalvisarvesh02292@gmail.com</a></li>
            <li><a href="https://www.instagram.com/_sarveshdalvi_" target="_blank" rel="noreferrer">@_sarveshdalvi_</a></li>
          </ul>
          <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Free delivery Pan India<br />
            International shipping available
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Sarvesh Dalvi Art. All artworks are original and copyright protected.</span>
        <div className="footer-legal">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
