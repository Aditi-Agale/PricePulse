import React, { useState } from "react";
import TrackForm from "./components/TrackForm";
import ProductPreview from "./components/ProductPreview";
import PriceGraph from "./components/PriceGraph";
import Profile from "./components/Profile";

// Auth Component
const Auth = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful authentication
      const userData = {
        user_id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.email.split('@')[0]
      };
      
      onAuthSuccess(userData);
      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            backgroundColor: '#fff'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            backgroundColor: '#fff'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {isSignUp && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          marginBottom: '20px',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            {isSignUp ? 'Creating Account...' : 'Signing In...'}
          </span>
        ) : (
          isSignUp ? 'Create Account' : 'Sign In'
        )}
      </button>

      <div style={{ textAlign: 'center' }}>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button
          type="button"
          onClick={toggleMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            marginLeft: '4px',
            textDecoration: 'underline'
          }}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [view, setView] = useState("dashboard"); // 'dashboard' or 'profile'

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setProduct(null);
    setView("dashboard");
  };

  if (!user) {
    return (
      <>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .auth-background {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .auth-background::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 25%);
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(20px, -20px) rotate(180deg); }
          }
          
          .auth-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 48px 40px;
            box-shadow: 
              0 32px 64px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.2);
            max-width: 420px;
            width: 100%;
            position: relative;
            z-index: 1;
            animation: slideUp 0.6s ease-out;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .auth-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .auth-title {
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
          }
          
          .auth-subtitle {
            color: #64748b;
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.8;
          }
          
          @media (max-width: 480px) {
            .auth-card {
              padding: 32px 24px;
              margin: 20px;
            }
            
            .auth-title {
              font-size: 2rem;
            }
          }
        `}</style>
        
        <div className="auth-background">
          <div className="auth-card">
            <div className="auth-header">
              <h1 className="auth-title">PricePulse</h1>
              <p className="auth-subtitle">Smart price tracking made simple</p>
            </div>
            <Auth onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }
        
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 20px 30px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          animation: slideDown 0.6s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .logo {
          color: #333;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        
        .nav-section {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .user-greeting {
          color: #555;
          font-weight: 500;
          background: rgba(168, 85, 247, 0.1);
          padding: 8px 15px;
          border-radius: 25px;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }
        
        .nav-button {
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          position: relative;
          overflow: hidden;
        }
        
        .nav-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .nav-button:hover:before {
          left: 100%;
        }
        
        .nav-button.active {
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          color: white;
          box-shadow: 0 5px 15px rgba(168, 85, 247, 0.3);
          transform: translateY(-2px);
        }
        
        .nav-button.inactive {
          background: rgba(168, 85, 247, 0.1);
          color: #a855f7;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }
        
        .nav-button.inactive:hover {
          background: rgba(168, 85, 247, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(168, 85, 247, 0.2);
        }
        
        .logout-button {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        
        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }
        
        .main-content {
          animation: fadeIn 0.8s ease-out;
        }
        
        .dashboard-grid {
          display: grid;
          gap: 30px;
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .header {
            flex-wrap: nowrap;
          }
          
          .nav-section {
            flex-wrap: nowrap;
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Component containers for better visual hierarchy */
        .component-wrapper {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .component-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
        }
        
        /* Responsive improvements */
        @media (max-width: 767px) {
          .app-container {
            padding: 15px;
          }
          
          .header {
            padding: 15px 20px;
            text-align: center;
          }
          
          .logo {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
          
          .nav-section {
            justify-content: center;
            width: 100%;
          }
          
          .user-greeting {
            order: -1;
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
          }
          
          .nav-button {
            padding: 8px 16px;
            font-size: 13px;
          }
        }
      `}</style>
      
      <div className="app-container">
        <header className="header">
          <h1 className="logo">PricePulse</h1>
          <div className="nav-section">
            <span className="user-greeting">Hello, {user.email}</span>
            <button
              onClick={() => setView("dashboard")}
              className={`nav-button ${view === "dashboard" ? "active" : "inactive"}`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setView("profile")}
              className={`nav-button ${view === "profile" ? "active" : "inactive"}`}
            >
              👤 Profile
            </button>
            <button
              onClick={handleLogout}
              className="nav-button logout-button"
            >
              🚪 Logout
            </button>
          </div>
        </header>

        <main className="main-content">
          {view === "dashboard" ? (
            <div className="dashboard-grid">
              <div className="component-wrapper">
                <TrackForm onTracked={setProduct} userId={user.user_id} />
              </div>
              
              {product && (
                <>
                  <div className="component-wrapper">
                    <ProductPreview product={product} />
                  </div>
                  <div className="component-wrapper" style={{ gridColumn: '1 / -1' }}>
                    <PriceGraph history={product.priceHistory} />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="component-wrapper">
              <Profile user={user} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;