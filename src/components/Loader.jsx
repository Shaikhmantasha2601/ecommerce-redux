import React from 'react';
export default function Loader({ label = 'Finding your lovely things...' }) {
  return <div className="loading-state" role="status"><span className="loader-orbit"><span/></span><p>{label}</p></div>;
}
