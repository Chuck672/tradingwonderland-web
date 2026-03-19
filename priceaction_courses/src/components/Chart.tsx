import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import { ChartData, ChartAnnotation } from '../types';

// Custom shape for the candlestick
const CandlestickShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  
  // High contrast institutional colors
  const color = isUp ? '#16a34a' : '#dc2626'; 

  // In Recharts, when passing `[low, high]` to Bar dataKey, 
  // `y` is the mapped value of `high`, and `height` is the mapped value of `high - low`.
  // So we can find the pixel ratio to map open/close.
  const priceRange = high - low;
  const unit = priceRange === 0 ? 0 : height / priceRange;
  
  const openY = y + (high - open) * unit;
  const closeY = y + (high - close) * unit;
  
  const bodyY = Math.min(openY, closeY);
  const bodyHeight = Math.abs(openY - closeY) || 1; 
  
  const centerX = x + width / 2;

  return (
    <g>
      {/* Wick */}
      <line 
        x1={centerX} 
        y1={y} 
        x2={centerX} 
        y2={y + height} 
        stroke={color} 
        strokeWidth={1.5} 
      />
      {/* Body */}
      <rect 
        x={x + width * 0.1} 
        y={bodyY} 
        width={width * 0.8} 
        height={bodyHeight} 
        fill={color} 
        stroke={color} 
      />
    </g>
  );
};

export const Chart = ({ data, annotations }: { data: ChartData[], annotations?: ChartAnnotation[] }) => {
  if (!data || data.length === 0) return null;

  // Prepare data by adding a range field for the Bar chart trick
  const processedData = data.map(d => ({
    ...d,
    range: [d.low, d.high]
  }));

  const min = Math.min(...data.map(d => d.low)) * 0.98;
  const max = Math.max(...data.map(d => d.high)) * 1.02;

  return (
    <div className="w-full h-full min-h-[300px] bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 font-mono shadow-xl relative overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#666" 
            tick={{ fill: '#666', fontSize: 12 }} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            domain={[min, max]} 
            stroke="#666" 
            tick={{ fill: '#666', fontSize: 12 }} 
            tickLine={false} 
            axisLine={false} 
            orientation="right"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
            itemStyle={{ color: '#aaa' }}
          />

          {/* Annotations */}
          {annotations?.map((ann, i) => {
            if (ann.type === 'fvg' || ann.type === 'ob') {
              return (
                <ReferenceArea 
                  key={i} 
                  x1={ann.x1} 
                  x2={ann.x2} 
                  y1={ann.y1} 
                  y2={ann.y2} 
                  fill={ann.color || 'rgba(255,255,255,0.1)'} 
                  strokeOpacity={0} 
                />
              );
            }
            if (ann.type === 'sweep' || ann.type === 'bos' || ann.type === 'choch' || ann.type === 'trend') {
              return (
                <ReferenceLine 
                  key={i}
                  segment={[{ x: ann.x1, y: ann.y1 }, { x: ann.x2, y: ann.y2 }]}
                  stroke={ann.color || '#fff'}
                  strokeWidth={2}
                  strokeDasharray={ann.type === 'choch' ? "4 4" : "0"}
                  ifOverflow="extendDomain"
                />
              );
            }
            if (ann.type === 'text') {
              return (
                <ReferenceArea 
                  key={i}
                  x1={ann.x1}
                  x2={ann.x1}
                  y1={ann.y1}
                  y2={ann.y1}
                  label={{ value: ann.text, position: 'top', fill: ann.color || '#fff', fontSize: 12, fontWeight: 'bold' }}
                  fillOpacity={0}
                />
              );
            }
            return null;
          })}

          <Bar 
            dataKey="range" 
            shape={<CandlestickShape />} 
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
