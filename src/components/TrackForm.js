import React, { useState } from 'react';

function TrackForm({ onTracked }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!url.startsWith('https://www.amazon')) {
      setError('Please enter a valid Amazon URL');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        onTracked(data);
        setUrl('');
      } else {
        setError(data.error || 'Failed to track product');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
      <label htmlFor="product-url" style={{ fontWeight: 500, marginRight: 12, minWidth: 180 }}>
        Enter Amazon Product URL:
      </label>
      <input
        id="product-url"
        type="text"
        placeholder="Paste Amazon URL here"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{
          flex: 1,
          padding: 8,
          fontSize: 16,
          marginRight: 12,
          border: '1px solid #ccc',
          borderRadius: 3,
        }}
        required
        disabled={loading}
      />
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
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Tracking...' : 'Track'}
      </button>
      {error && <div style={{ color: 'red', marginLeft: 16 }}>{error}</div>}
    </form>
  );
}

export default TrackForm;
