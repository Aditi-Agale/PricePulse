import React, { useState } from 'react';

function PriceTracker() {
  const [productUrl, setProductUrl] = useState('');
  // Example static data; replace with real data from backend/API as needed
  const product = {
    name: "Samsung Galaxy M14",
    currentPrice: "₹13,499",
    image: "", // Add image URL if available
    priceHistory: [], // Add price history data for graph
    otherPlatforms: [
      { name: "Flipkart", price: "₹13,299" },
      { name: "Meesho", price: "₹13,499" },
      { name: "BigBasket", price: "Not Available" }
    ]
  };

  const handleTrack = () => {
    // Implement track logic here
    alert('Track button clicked!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '30px auto', border: '1px solid #ddd', borderRadius: 6, background: '#fff', boxShadow: '0 2px 8px #f0f0f0' }}>
      <div style={{ background: '#2196f3', padding: '16px 0', color: '#fff', borderRadius: '6px 6px 0 0', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        PricePulse - E-Commerce Price Tracker
      </div>
      <div style={{ padding: 24 }}>
        <div>
          <label htmlFor="product-url" style={{ fontWeight: 'bold' }}>Enter Amazon Product URL:</label>
          <div style={{ display: 'flex', marginTop: 8, marginBottom: 20 }}>
            <input
              id="product-url"
              type="text"
              value={productUrl}
              onChange={e => setProductUrl(e.target.value)}
              style={{ flex: 1, padding: 8, fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
            />
            <button
              onClick={handleTrack}
              style={{ marginLeft: 8, padding: '8px 24px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
            >
              Track
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Product Preview:</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 80, height: 60, background: '#e0e0e0', border: '1px solid #ccc', marginRight: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product.image ? <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : null}
            </div>
            <div>
              <div>{product.name}</div>
              <div>Current Price: {product.currentPrice}</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Price History Graph:</div>
          <div style={{ width: '100%', height: 160, border: '1px solid #bbb', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            [Graph Placeholder]
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Available on Other Platforms (Bonus):</div>
          <div style={{ border: '1px solid #bbb', background: '#f5f5f5', padding: 12 }}>
            {product.otherPlatforms.map((platform, idx) => (
              <div key={idx}>- {platform.name}: {platform.price}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceTracker;
