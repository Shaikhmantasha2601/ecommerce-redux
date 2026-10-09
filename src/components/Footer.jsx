import React from 'react';
import { ArrowUpRight, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link to="/" className="brand footer-brand"><span className="brand-mark">l.</span><span>luma<span className="brand-dot">.</span></span></Link>
          <p>Thoughtful little things for your everyday.</p>
          <div className="social-row"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/></a><span className="social-note">Made with <Heart size={13} fill="currentColor"/> for good living</span></div>
        </div>
        <div><h4>Explore</h4><Link to="/products">Shop all</Link><Link to="/products?category=Clothing">Clothing</Link><Link to="/products?category=Home">Home & living</Link><Link to="/products?category=Accessories">Accessories</Link></div>
        <div><h4>We're here</h4><a href="mailto:hello@luma.example">Contact us</a><a href="mailto:hello@luma.example">Shipping & returns</a><a href="mailto:hello@luma.example">FAQs</a></div>
        <div className="footer-newsletter"><h4>A little note from us</h4><p>Good finds, new arrivals, and a little inspiration.</p><form onSubmit={(e) => { e.preventDefault(); window.alert('Thanks for your interest! Newsletter signup is a demo feature.'); }}><input type="email" aria-label="Email address" placeholder="Your email address" required/><button aria-label="Subscribe"><ArrowUpRight size={18}/></button></form></div>
      </div>
      <div className="footer-bottom"><span>Â© {new Date().getFullYear()} Luma Studio. Student project demo.</span><span>Made for the everyday moments.</span></div>
    </footer>
  );
}
