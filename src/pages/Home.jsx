import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Heart, Leaf, PackageCheck, Sparkles } from 'lucide-react';
import { fetchProducts } from '../features/products/productSlice';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';

const categories = [
  { name: 'Clothing', eyebrow: 'Easy layers', className: 'category-lilac', symbol: '01' },
  { name: 'Home', eyebrow: 'Make it cosy', className: 'category-peach', symbol: '02' },
  { name: 'Accessories', eyebrow: 'Little details', className: 'category-sage', symbol: '03' },
  { name: 'Electronics', eyebrow: 'Smart essentials', className: 'category-blue', symbol: '04' },
];

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  useEffect(() => { if (status === 'idle') dispatch(fetchProducts()); }, [dispatch, status]);
  const featured = items.filter((p) => p.badge).slice(0, 4);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/><Sparkles size={14}/> THE LITTLE THINGS CLUB</div>
          <h1>Find your<br/><span>everyday</span> favourite<span className="hero-period">.</span></h1>
          <p>Thoughtful pieces, feel-good finds, and little upgrades that make your everyday a bit more lovely.</p>
          <div className="hero-actions"><Link to="/products" className="button button-primary">Explore the collection <ArrowRight size={17}/></Link><Link to="/products?category=Home" className="text-link">Find your little joy <ArrowUpRight size={16}/></Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span>M</span><span>A</span><span>S</span><span>+</span></div><div><div className="proof-stars">â˜…â˜…â˜…â˜…â˜…</div><p>Loved by <strong>2,000+</strong> happy shoppers</p></div></div>
          <span className="hero-doodle doodle-one">âœ³</span><span className="hero-doodle doodle-two">âœ¦</span>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90" alt="Curated everyday fashion and accessories" onError={(e) => { e.currentTarget.src = 'https://placehold.co/900x1100/f0eaff/6d4aff?text=Everyday+Favourites'; }}/></div>
          <div className="hero-sticker"><span>good things</span><strong>live here</strong><span className="sticker-sparkle">âœ³</span></div>
          <div className="floating-note"><span className="floating-note-icon"><Heart size={17}/></span><span><strong>Made for you</strong><small>Little joys, every day</small></span></div>
          <span className="hero-orbit orbit-a"/><span className="hero-orbit orbit-b"/>
        </div>
        <div className="hero-bottom-note"><span>SCROLL A LITTLE</span><span className="scroll-line"/></div>
      </section>

      <section className="trust-strip"><div><PackageCheck size={19}/><span>Little things, big joy</span></div><span className="trust-dot">âœ³</span><div><Leaf size={19}/><span>Thoughtfully picked</span></div><span className="trust-dot">âœ³</span><div><Heart size={19}/><span>Made for everyday</span></div><span className="trust-dot">âœ³</span><div><Sparkles size={19}/><span>Feel-good finds</span></div></section>

      <section className="section-wrap category-section">
        <div className="section-heading"><div><span className="section-kicker">A LITTLE BIT OF EVERYTHING</span><h2>What are we feeling <span>today?</span></h2></div><Link to="/products" className="text-link">All categories <ArrowUpRight size={16}/></Link></div>
        <div className="category-grid">{categories.map((category) => <Link key={category.name} to={`/products?category=${category.name}`} className={`category-tile ${category.className}`}><span className="category-number">{category.symbol} / CATEGORY</span><span className="category-eyebrow">{category.eyebrow}</span><strong>{category.name}</strong><span className="category-arrow"><ArrowUpRight size={18}/></span><span className="category-decoration">{category.name === 'Clothing' ? 'âœ³' : category.name === 'Home' ? 'âŒ‚' : category.name === 'Accessories' ? 'â—‡' : 'â—‰'}</span></Link>)}</div>
      </section>

      <section className="featured-section">
        <div className="section-wrap">
          <div className="section-heading"><div><span className="section-kicker">THE CROWD PLEASERS</span><h2>Little things, <span>big love.</span></h2><p className="section-description">The pieces everyone's adding to their everyday.</p></div><Link to="/products" className="button button-outline">Shop all finds <ArrowRight size={16}/></Link></div>
          {status === 'loading' || status === 'idle' ? <Loader/> : status === 'failed' ? <div className="error-state"><p>{error}</p><button className="button button-primary" onClick={() => dispatch(fetchProducts())}>Try again</button></div> : <ProductGrid products={featured.length ? featured : items.slice(0, 4)}/>}
        </div>
      </section>

      <section className="manifesto-section"><div className="manifesto-scribble">âœ³</div><span className="section-kicker">OUR LITTLE PHILOSOPHY</span><h2>It's not about having more.<br/>It's about finding <em>your more.</em></h2><p>Pieces that feel like you. Everyday essentials that earn their place. A little joy in the ordinary.</p><Link to="/products" className="button button-light">Find your favourites <ArrowRight size={17}/></Link><span className="manifesto-star star-left">âœ¦</span><span className="manifesto-star star-right">âœ³</span></section>

      <section className="section-wrap all-products-section"><div className="section-heading"><div><span className="section-kicker">A FEW MORE GOOD THINGS</span><h2>Meet your next <span>favourite.</span></h2></div><Link to="/products" className="text-link">See everything <ArrowUpRight size={16}/></Link></div>{status === 'succeeded' && <ProductGrid products={items.slice(4, 8)}/>}</section>
    </main>
  );
}
