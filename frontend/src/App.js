import React, { useState } from "react";
import Auth from "./components/Auth";
import TrackForm from "./components/TrackForm";
import ProductPreview from "./components/ProductPreview";
import PriceGraph from "./components/PriceGraph";

function App() {
  const [user, setUser] = useState(null);  // null means not logged in
  const [product, setProduct] = useState(null);

  // Called when auth succeeds (login/signup)
  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  // Optional: logout function
  const handleLogout = () => {
    setUser(null);
    setProduct(null);
  };

  if (!user) {
    // Not logged in - show Auth form
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "Arial, sans-serif" }}>
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Logged in - show main app
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: "#2196f3" }}>PricePulse - E-Commerce Price Tracker</h1>
        <div>
          <span style={{ marginRight: 10 }}>Hello, {user.email}</span>
          <button onClick={handleLogout} style={{
            padding: "6px 12px",
            backgroundColor: "#f44336",
            border: "none",
            color: "#fff",
            borderRadius: 4,
            cursor: "pointer"
          }}>
            Logout
          </button>
        </div>
      </header>

      <TrackForm onTracked={setProduct} />
      <ProductPreview product={product} />
      <PriceGraph history={product ? product.priceHistory : []} />
    </div>
  );
}

export default App;
