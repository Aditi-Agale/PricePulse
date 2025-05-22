import React from 'react';

function ProductPreview({ product }) {
  if (!product) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 'bold', marginBottom: 6 }}>Product Preview:</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: 120,
          height: 70,
          background: '#e0e0e0',
          border: '1px solid #ccc',
          marginRight: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {product.image ? (
            <img src={product.image} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            <span style={{ color: '#888' }}>No Image</span>
          )}
        </div>
        <div>
          <div>{product.name}</div>
          <div>Current Price: ₹{product.currentPrice ?? 'N/A'}</div>
          <a href={product.url} target="_blank" rel="noopener noreferrer">View on Amazon</a>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
