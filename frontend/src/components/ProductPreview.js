import React from 'react';

function ProductPreview({ product }) {
  if (!product) return null;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px',
        borderBottom: '1px solid #f3f4f6',
        paddingBottom: '12px',
      }}>
        Product Preview
      </h3>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '20px',
        alignItems: 'start',
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {product.image ? (
            <img
              src={product.image}
              alt="Product"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
              }}
            />
          ) : (
            <span style={{ color: '#9ca3af', fontSize: '12px' }}>No Image</span>
          )}
        </div>

        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '12px',
            lineHeight: '1.4',
          }}>
            {product.name}
          </div>

          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#059669',
            marginBottom: '16px',
          }}>
            ₹{product.currentPrice ?? 'N/A'}
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#111827',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#111827'}
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}


export default ProductPreview;
