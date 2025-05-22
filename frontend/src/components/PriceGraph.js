import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function PriceGraph({ history }) {
  if (!history || history.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: 180,
        border: '1px solid #bbb',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#aaa',
        marginBottom: 16
      }}>
        [Graph Placeholder]
      </div>
    );
  }
  const data = history.map(item => ({
    price: item.price,
    date: new Date(item.timestamp || item.date).toLocaleString(),
  }));

  return (
    <div style={{ width: '100%', height: 180, marginBottom: 16 }}>
      <div style={{ fontWeight: 'bold', marginBottom: 6 }}>Price History Graph:</div>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" />
          <Line type="monotone" dataKey="price" stroke="#2196f3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceGraph;
