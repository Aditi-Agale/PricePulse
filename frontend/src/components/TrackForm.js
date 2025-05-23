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

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 24 }}
    >
      <label htmlFor="product-url" style={{ fontWeight: 500, minWidth: 180 }}>
        Enter Amazon Product URL:
      </label>
      <input
        id="product-url"
        type="text"
        placeholder="Paste Amazon URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          flexGrow: 1,
          minWidth: 240,
          padding: 8,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 3,
        }}
        required
        disabled={loading}
      />

      <label htmlFor="target-price" style={{ fontWeight: 500, minWidth: 180 }}>
        Notify me when price drops below ₹:
      </label>
      <input
        id="target-price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Optional"
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
        style={{
          width: 150,
          padding: 8,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 3,
        }}
        disabled={loading}
      />

      <label htmlFor="email" style={{ fontWeight: 500, minWidth: 180 }}>
        <br></br><br></br>
        Your Email:
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flexGrow: 1,
          minWidth: 240,
          padding: 8,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 3,
        }}
        required
        disabled={loading}
      />

      <div style={{ flexBasis: '100%', height: 0 }} />

      <button
        type="submit"
        style={{
          background: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: 3,
          padding: '10px 32px',
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 8,
        }}
        disabled={loading}
      >
        {loading ? 'Tracking...' : 'Track'}
      </button>

      {error && <div style={{ color: 'red', marginLeft: 16, marginTop: 8 }}>{error}</div>}

      {alertStatus && (
        <div
          style={{
            marginLeft: 16,
            marginTop: 8,
            fontWeight: '600',
            color: alertStatus === 'sent' ? 'green' : '#555',
          }}
        >
          {alertStatus === 'sent' ? 'Alert sent!' : 'Alert scheduled'}
        </div>
      )}
    </form>
  );
}

export default TrackForm;
