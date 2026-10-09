import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck, Trash2, Truck } from 'lucide-react';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartCount, selectCartItems, selectCartSubtotal } from '../features/cart/cartSlice';
import { formatPrice } from '../components/ProductCard';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 99;
  const total = subtotal + shipping;
  const remaining = Math.max(0, 2999 - subtotal);
  const checkout = () => window.alert('Thanks for trying Luma! Checkout is a demo feature for this frontend project.');

  if (!items.length) return <main className="empty-cart-page"><div className="empty-cart-art"><ShoppingBag size={42}/><span>âœ³</span></div><span className="section-kicker">YOUR BAG IS WAITING</span><h1>A little room for <em>something lovely.</em></h1><p>Your bag is taking a tiny break. Let's find something you'll love.</p><Link to="/products" className="button button-primary">Explore the collection <ArrowRight size={17}/></Link><div className="empty-cart-footnote">Good things are just around the corner âœ¦</div></main>;

  return (
    <main className="cart-page section-wrap">
      <div className="cart-heading"><div><span className="section-kicker">YOUR LITTLE HAUL</span><h1>Your shopping <em>bag.</em></h1><p>{count} {count === 1 ? 'item' : 'items'} picked just for you.</p></div><Link to="/products" className="text-link"><ArrowLeft size={16}/> Keep browsing</Link></div>
      <div className="cart-layout">
        <section className="cart-items-panel"><div className="cart-panel-header"><span>YOUR FINDS ({count})</span><button className="clear-cart-button" onClick={() => { if (window.confirm('Remove all items from your bag?')) dispatch(clearCart()); }}>Clear bag</button></div>
          {items.map((item) => <article className="cart-item" key={item.id}><Link to={`/products/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.src = 'https://placehold.co/180x200/f0eaff/6d4aff?text=Luma'; }}/></Link><div className="cart-item-info"><span className="product-category">{item.category}</span><Link to={`/products/${item.id}`} className="cart-item-name">{item.name}</Link><span className="cart-item-color">Colour: {item.color}</span><div className="cart-item-bottom"><div className="quantity-stepper cart-quantity"><button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => dispatch(increaseQuantity(item.id))} aria-label={`Increase ${item.name} quantity`}><Plus size={13}/></button></div><button className="remove-item" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={14}/> Remove</button></div></div><div className="cart-item-price"><strong>{formatPrice(item.price * item.quantity)}</strong>{item.quantity > 1 && <small>{formatPrice(item.price)} each</small>}</div></article>)}
          <Link to="/products" className="continue-shopping"><ArrowLeft size={15}/> Add a few more good things</Link>
        </section>
        <aside className="order-summary"><span className="section-kicker">THE LITTLE BREAKDOWN</span><h2>Order summary</h2><div className="summary-line"><span>Subtotal Â· {count} items</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><strong className={shipping === 0 ? 'free-shipping' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</strong></div>{remaining > 0 && <div className="shipping-progress"><div className="shipping-progress-copy"><Truck size={16}/><span>Add <strong>{formatPrice(remaining)}</strong> for free shipping!</span></div><div className="progress-track"><span style={{ width: `${Math.min(100, subtotal / 2999 * 100)}%` }}/></div></div>}{shipping === 0 && <div className="free-shipping-note"><Truck size={16}/> You've unlocked free shipping. Lovely!</div>}<div className="summary-divider"/><div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div><p className="tax-note">Inclusive of applicable taxes.</p><button className="button button-primary checkout-button" onClick={checkout}>Continue to checkout <ArrowRight size={17}/></button><div className="secure-note"><ShieldCheck size={15}/> Safe, secure, and full of good things</div><div className="summary-promise"><span>âœ³</span><p><strong>A little promise</strong><br/>Thoughtful finds, transparent prices, no surprises.</p></div></aside>
      </div>
    </main>
  );
}
