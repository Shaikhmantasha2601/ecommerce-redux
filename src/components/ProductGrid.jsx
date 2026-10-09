import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty-state"><div className="empty-icon"><PackageSearch size={28}/></div><h3>No finds just yet</h3><p>Try a different search or clear your filters to see all our lovely things.</p></div>;
  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div>;
}
