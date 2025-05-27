import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Profile = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [priceData, setPriceData] = useState({}); // { productId: [ { timestamp, price } ] }

  // Fetch tracked products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://pricepulse-30l9.onrender.com/api/products/${user.user_id}`);
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, [user.user_id]);

  // Fetch price history for each product
  useEffect(() => {
    const fetchPriceHistory = async () => {
      const allPriceData = {};
      for (const product of products) {
        const res = await fetch(`https://pricepulse-30l9.onrender.com/api/prices/${product.id}`);
        const data = await res.json();
        allPriceData[product.id] = data.history;
      }
      setPriceData(allPriceData);
    };

    if (products.length > 0) fetchPriceHistory();
  }, [products]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Welcome, {user.email}</h2>
        <p>User ID: {user.user_id}</p>
      </div>

      <div className="products-section">
        <h3>Your Tracked Products</h3>
        {products.length === 0 ? (
          <p>No products being tracked.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p>Target Price: ₹{product.target_price}</p>
              <a href={product.url} target="_blank" rel="noreferrer">View Product</a>

              {priceData[product.id] && (
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={priceData[product.id]}>
                      <XAxis dataKey="timestamp" tick={false} />
                      <YAxis domain={["dataMin", "dataMax"]} />
                      <Tooltip />
                      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
