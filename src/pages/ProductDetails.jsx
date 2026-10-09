import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { fetchProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { formatPrice } from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => { if (status === 'idle') dispatch(fetchProducts()); }, [dispatch, status]);
  const product = items.find((item) => item.id === Number(id));
  const related = product ? items.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4) : [];

  if (status === 'loading' || status === 'idle') return <main className="section-wrap"><Loader label="Getting the details..." /></main>;
  if (status === 'failed') return <main className="section-wrap error-state"><p>{error}</p><button className="button button-primary" onClick={() => dispatch(fetchProducts())}>Try again</button></main>;
  if (!product) return <main className="not-found"><span className="not-found-code">404</span><h1>Oops, this find wandered off.</h1><p>Let's get you back to the good stuff.</p><Link to="/products" className="button button-primary"><ArrowLeft size={17}/> Back to shop</Link></main>;

  const addSelected = () => {
    for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="product-detail-page">
      <div className="section-wrap detail-wrap">
        <div className="detail-breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Shop</Link><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong></div>
        <div className="detail-layout">
          <div className="detail-image-column"><div className="detail-main-image"><img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x950/f0eaff/6d4aff?text=Luma+Finds'; }}/>{product.badge && <span className="product-badge detail-badge">{product.badge}</span>}<button className={`detail-heart ${liked ? 'is-liked' : ''}`} onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={20} fill={liked ? 'currentColor' : 'none'}/></button></div><div className="image-caption"><span>âœ³ A little something special</span><span>Designed for everyday</span></div></div>
          <div className="detail-info"><span className="section-kicker">{product.category.toUpperCase()} / LUMA EDIT</span><h1>{product.name}</h1><div className="detail-rating"><span className="rating-stars"><Star size={15} fill="currentColor"/>{product.rating}</span><span className="rating-divider">Â·</span><span>{product.reviews} happy reviews</span><span className="rating-divider">Â·</span><span className="stock-indicator"><span/> In stock</span></div><div className="detail-price-row"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <><del>{formatPrice(product.oldPrice)}</del><span className="detail-save">Save {formatPrice(product.oldPrice - product.price)}</span></>}</div><p className="detail-description">{product.description}</p><div className="detail-feature"><span className="feature-check"><Check size={14}/></span><span>Thoughtfully picked, ready for your everyday</span></div><div className="detail-feature"><span className="feature-check"><Check size={14}/></span><span>Lovely quality, even lovelier value</span></div><div className="detail-divider"/><div className="quantity-label">QUANTITY</div><div className="detail-actions"><div className="quantity-stepper"><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={quantity <= 1}><Minus size={15}/></button><span>{quantity}</span><button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity"><Plus size={15}/></button></div><button className={`button button-primary detail-add-button ${added ? 'button-success' : ''}`} onClick={addSelected}>{added ? <Check size={18}/> : <ShoppingBag size={18}/>} {added ? 'Added to your bag!' : `Add to bag Â· ${formatPrice(product.price * quantity)}`}</button></div><div className="delivery-notes"><div><Truck size={19}/><span><strong>A little delivery joy</strong><small>Free shipping over â‚¹2,999</small></span></div><div><ShieldCheck size={19}/><span><strong>Shop with confidence</strong><small>Easy returns on eligible items</small></span></div></div><Link to="/products" className="back-to-shop"><ArrowLeft size={15}/> Back to all finds</Link></div>
        </div>
      </div>
      {related.length > 0 && <section className="related-section"><div className="section-wrap"><div className="section-heading"><div><span className="section-kicker">MORE TO LOVE</span><h2>Good company for <span>your find.</span></h2></div><Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-link">More {product.category} <ArrowRight size={16}/></Link></div><ProductGrid products={related}/></div></section>}
    </main>
  );
}
