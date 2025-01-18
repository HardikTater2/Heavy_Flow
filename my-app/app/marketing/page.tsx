'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react';

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Marketing Insights
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Campaign Performance</h2>
            <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <IncreasingGraph />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">ROI Tracker</h2>
            <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <GradientBarGraph />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <MarketingFeatureCard title="Ad Manager" description="Optimize your ad campaigns" />
          <MarketingFeatureCard title="Audience Targeting" description="Reach the right people" />
          <MarketingFeatureCard title="Analytics Dashboard" description="Track your marketing KPIs" />
        </motion.div>
      </main>
    </div>
  )
}

function MarketingFeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

function IncreasingGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate increasing data points with some random variation
    const points = Array.from({ length: 20 }, (_, i) => {
      const trend = (i / 20) * 80; // Base upward trend
      const variation = Math.random() * 20 - 10; // Random variation ±10
      return Math.min(Math.max(trend + variation, 0), 100); // Keep between 0-100
    });
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    
    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = (canvas.width / (points.length - 1)) * index;
      const y = canvas.height - (point / 100) * canvas.height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Add gradient under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={200} 
      className="w-full h-full bg-gray-700 rounded-lg"
    />
  );
}

function GradientBarGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate increasing data with some variation
    const bars = Array.from({ length: 6 }, (_, i) => {
      const base = 30 + (i * 10); // Base increasing value
      return base + (Math.random() * 20); // Add random variation
    });
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = (canvas.width / bars.length) * 0.7;
    const spacing = (canvas.width / bars.length) * 0.3;
    
    bars.forEach((height, index) => {
      const x = (barWidth + spacing) * index + spacing/2;
      const barHeight = (height / 100) * canvas.height;
      const y = canvas.height - barHeight;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
      gradient.addColorStop(0, '#a855f7');  // Purple-500
      gradient.addColorStop(1, '#6b21a8');  // Purple-800
      
      // Draw bar with rounded top
      ctx.beginPath();
      ctx.moveTo(x, canvas.height);
      ctx.lineTo(x, y + 10);
      ctx.quadraticCurveTo(x, y, x + barWidth/2, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + 10);
      ctx.lineTo(x + barWidth, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add shine effect
      const shineGradient = ctx.createLinearGradient(x, y, x + barWidth, y);
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      
      ctx.fillStyle = shineGradient;
      ctx.fill();
    });
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={200} 
      className="w-full h-full bg-gray-700 rounded-lg"
    />
  );
}

