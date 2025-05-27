import React, { useState } from 'react';

function TrackForm({ onTracked, alertStatus }) {
  const [url, setUrl] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!url.startsWith('https://www.amazon')) {
      setError('Please enter a valid Amazon URL');
      return;
    }
    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }
    if (targetPrice && isNaN(Number(targetPrice))) {
      setError('Target price must be a valid number');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          targetPrice: targetPrice ? Number(targetPrice) : null,
          email: email.trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onTracked(data);
        setUrl('');
        setTargetPrice('');
        setEmail('');
      } else {
        setError(data.error || 'Failed to track product');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#ffffff',
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '32px',
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        Amazon Price Tracker
      </h2>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px',
          }}>
            Product URL
          </label>
          <input
            type="text"
            placeholder="https://www.amazon.in/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: error && !url ? '#ef4444' : '#e5e7eb',
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
            disabled={loading}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...inputStyle,
                borderColor: error && !email.trim() ? '#ef4444' : '#e5e7eb',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Target Price (₹)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Optional"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 24px',
            backgroundColor: loading ? '#9ca3af' : '#111827',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            marginTop: '8px',
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = '#374151';
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = '#111827';
          }}
        >
          {loading ? 'Tracking...' : 'Track Product'}
        </button>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {alertStatus && (
          <div style={{
            padding: '12px',
            backgroundColor: alertStatus === 'sent' ? '#f0fdf4' : '#eff6ff',
            border: `1px solid ${alertStatus === 'sent' ? '#bbf7d0' : '#bfdbfe'}`,
            borderRadius: '6px',
            color: alertStatus === 'sent' ? '#16a34a' : '#2563eb',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            {alertStatus === 'sent' ? 'Alert sent' : 'Alert scheduled'}
          </div>
        )}
      </div>
    </div>
  );
}
export default TrackForm;