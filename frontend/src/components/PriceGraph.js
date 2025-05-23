import React from 'react'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function PriceGraph({ history }) {
  if (!history || history.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: 200,
          border: '1px dashed #bbb',
          background: '#f4f6f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontStyle: 'italic',
          marginBottom: 16,
          borderRadius: 8,
        }}
      >
        No price data available
      </div>
    );
  }

  const data = history.map((item) => {
    const date = new Date(item.timestamp || item.date);
    return {
      price: item.price,
      date: date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      fullTimestamp: `${date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      })}, ${date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    };
  });

  return (
    <div
      style={{
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 10,
        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)',
        marginBottom: 20,
      }}
    >
      <div style={{ fontWeight: '600', fontSize: 18, marginBottom: 14 }}>
        📉 Price History Graph
      </div>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="date"
            stroke="#555"
            tick={{ fontSize: 12 }}
            label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            stroke="#555"
            domain={['auto', 'auto']}
            tickFormatter={(value) => `₹${value}`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => `₹${value}`}
            labelFormatter={(label, payload) => {
              const full = payload[0]?.payload?.fullTimestamp;
              return `📅 ${full}`;
            }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: 6,
              fontSize: 14,
              padding: 10,
            }}
          />
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4caf50"
            strokeWidth={3}
            dot={{ r: 4, stroke: '#388e3c', strokeWidth: 2, fill: '#a5d6a7' }}
            activeDot={{ r: 6, stroke: '#2e7d32', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceGraph;
