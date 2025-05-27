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
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 40px auto',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px',
          opacity: '0.3',
        }}>📊</div>
        <div style={{
          fontSize: '16px',
          color: '#6b7280',
        }}>
          No price data available
        </div>
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
    <div style={{
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px',
        borderBottom: '1px solid #f3f4f6',
        paddingBottom: '12px',
      }}>
        Price History
      </h3>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              stroke="#6b7280"
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(value) => `₹${value}`}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Price']}
              labelFormatter={(label, payload) => {
                const full = payload[0]?.payload?.fullTimestamp;
                return full;
              }}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#111827"
              strokeWidth={2}
              dot={{ 
                r: 4, 
                stroke: '#111827', 
                strokeWidth: 2, 
                fill: '#ffffff'
              }}
              activeDot={{ 
                r: 6, 
                stroke: '#111827', 
                strokeWidth: 2,
                fill: '#111827'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export default PriceGraph;
