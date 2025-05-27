import React, { useState } from "react";
import "./Auth.css";

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

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </label>

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

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
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
