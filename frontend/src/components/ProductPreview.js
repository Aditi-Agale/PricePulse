import React from 'react';

function ProductPreview({ product }) {
  if (!product) return null;

  return (
    <div
      style={{
        marginBottom: 24,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: 500,
      }}
    >
      <div
        style={{
          fontWeight: '700',
          marginBottom: 12,
          fontSize: 18,
          color: '#222',
          letterSpacing: '0.03em',
          borderBottom: '2px solid #0073e6',
          paddingBottom: 6,
          maxWidth: 160,
        }}
      >
        Product Preview
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            width: 180,
            height: 110,
            backgroundColor: '#f9fafb',
            border: '1px solid #ddd',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt="Product"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ color: '#bbb', fontSize: 16, fontStyle: 'italic' }}>No Image</span>
          )}
        </div>

        <div style={{ color: '#333', flex: 1 }}>
          <div
            style={{
              fontWeight: '600',
              fontSize: 17,
              marginBottom: 8,
              lineHeight: 1.3,
            }}
            title={product.name}
          >
            {product.name}
          </div>
          <div
            style={{
              marginBottom: 12,
              fontSize: 15,
              color: '#555',
            }}
          >
            Current Price: <strong style={{ color: '#0073e6' }}>₹{product.currentPrice ?? 'N/A'}</strong>
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 15,
              color: '#0073e6',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: 4,
              border: '1px solid #0073e6',
              userSelect: 'none',
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#0073e6';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.textDecoration = 'none';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0073e6';
            }}
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
