import React, { useState } from "react";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setError(null);
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // On success, call parent callback with user data (e.g. token or email)
        onAuthSuccess(data);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("Network error");
    }
    setLoading(false);
  };
  return(
    <>
<div className="auth-container">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <div className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div 
            disabled={loading} 
            className="submit-button"
            onClick={handleSubmit}
            style={{ 
              pointerEvents: loading ? 'none' : 'auto',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading && <span className="loading-spinner"></span>}
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </div>
        </div>

        <div className="auth-toggle">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button onClick={toggleMode} className="link-btn">
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={toggleMode} className="link-btn">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;