import React from 'react';
import { Heart, ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useState } from 'react';

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card" style={{ '--card-delay': `${Math.min(index, 8) * 55}ms` }}>
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x700/f0eaff/6d4aff?text=Luma+Finds'; }} />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        <button className={`wishlist-button ${liked ? 'is-liked' : ''}`} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => setLiked(!liked)}><Heart size={17} fill={liked ? 'currentColor' : 'none'}/></button>
        <button className={`quick-add ${added ? 'quick-added' : ''}`} onClick={handleAdd}><ShoppingBag size={16}/><span>{added ? 'Added!' : 'Quick add'}</span></button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}<ArrowUpRight className="product-link-icon" size={15}/></Link>
        <div className="product-meta"><div className="price-row"><span className="price">{formatPrice(product.price)}</span>{product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}</div><span className="rating"><Star size={13} fill="currentColor"/>{product.rating}</span></div>
      </div>
    </article>
  );
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}
