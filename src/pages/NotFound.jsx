import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="not-found"><span className="not-found-code">404</span><h1>Looks like this page took a little detour.</h1><p>No worries â€” your next favourite is still waiting.</p><Link to="/" className="button button-primary"><ArrowLeft size={17}/> Back to home</Link></main>;
}
