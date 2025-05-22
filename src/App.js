import React, { useState } from 'react';
import TrackForm from './components/TrackForm';
import ProductPreview from './components/ProductPreview';
import PriceGraph from './components/PriceGraph';

function App() {
  const [product, setProduct] = useState(null);

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2196f3' }}>PricePulse - E-Commerce Price Tracker</h1>
      <TrackForm onTracked={setProduct} />
      <ProductPreview product={product} />
      <PriceGraph history={product ? product.priceHistory : []} />
    </div>
  );
}

export default App;
