import React from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';

export default function Navbar() {
  const count = useSelector(selectCartCount);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/products${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="announcement"><Sparkles size={14} /> A little treat: free shipping on orders over â‚¹2,999</div>
      <header className="site-header">
        <div className="header-inner">
          <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link to="/" className="brand" aria-label="Luma home"><span className="brand-mark">l.</span><span>luma<span className="brand-dot">.</span></span></Link>
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop all</NavLink>
            <NavLink to="/products?category=Home" onClick={() => setMenuOpen(false)}>Home living</NavLink>
            <NavLink to="/products?category=Accessories" onClick={() => setMenuOpen(false)}>Accessories</NavLink>
          </nav>
          <form className="header-search" onSubmit={submitSearch}>
            <Search size={17} />
            <input aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for something lovely..." />
            {search && <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setSearch('')}><X size={14}/></button>}
          </form>
          <Link to="/cart" className="cart-link" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={21} /><span className="cart-label">Bag</span><span className="cart-count">{count}</span></Link>
        </div>
      </header>
    </>
  );
}
