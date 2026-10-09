import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ArrowUpDown } from 'lucide-react';
import { fetchProducts } from '../features/products/productSlice';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';

const categories = ['All', 'Clothing', 'Electronics', 'Home', 'Accessories'];

export default function Products() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { if (status === 'idle') dispatch(fetchProducts()); }, [dispatch, status]);
  useEffect(() => {
    setSearch(params.get('search') || '');
    setCategory(params.get('category') || 'All');
  }, [params]);

  const filtered = useMemo(() => {
    let result = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()));
    if (category !== 'All') result = result.filter((item) => item.category === category);
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [items, search, category, sort]);

  const chooseCategory = (value) => {
    setCategory(value);
    const next = new URLSearchParams(params);
    if (value === 'All') next.delete('category'); else next.set('category', value);
    setParams(next);
  };
  const clearFilters = () => { setSearch(''); setCategory('All'); setSort('featured'); setParams({}); };

  return (
    <main className="catalog-page">
      <div className="catalog-hero"><div className="catalog-hero-inner"><span className="section-kicker">THE LUMA COLLECTION</span><h1>Good things, <span>right this way.</span></h1><p>A thoughtful little collection of things to wear, use, and love.</p><div className="catalog-breadcrumb"><a href="/">Home</a><span>/</span><strong>Shop all</strong></div><span className="catalog-hero-flower">âœ³</span></div></div>
      <div className="section-wrap catalog-content">
        <div className="catalog-toolbar"><div className="catalog-count"><strong>{filtered.length}</strong> lovely {filtered.length === 1 ? 'find' : 'finds'} <span>to explore</span></div><div className="catalog-tools"><button className={`filter-toggle ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/>{filtersOpen ? 'Hide filters' : 'Filters'}</button><label className="sort-select"><ArrowUpDown size={15}/><span>Sort:</span><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
        {filtersOpen && <div className="filter-panel"><div className="filter-panel-title"><strong><SlidersHorizontal size={16}/> Find your kind of lovely</strong><button className="text-link" onClick={clearFilters}>Clear all <X size={14}/></button></div><div className="filter-group"><span className="filter-label">CATEGORY</span><div className="filter-chips">{categories.map((item) => <button key={item} className={`filter-chip ${category === item ? 'selected' : ''}`} onClick={() => chooseCategory(item)}>{item}</button>)}</div></div><div className="filter-group"><label className="filter-label" htmlFor="catalog-search">SEARCH BY NAME</label><div className="catalog-search"><Search size={17}/><input id="catalog-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Try headphones, vase, tote..."/></div></div></div>}
        {status === 'loading' || status === 'idle' ? <Loader/> : status === 'failed' ? <div className="error-state"><p>{error}</p><button className="button button-primary" onClick={() => dispatch(fetchProducts())}>Try again</button></div> : <ProductGrid products={filtered}/>}
      </div>
    </main>
  );
}
