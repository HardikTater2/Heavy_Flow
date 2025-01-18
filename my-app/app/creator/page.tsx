'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect } from 'react';

export default function Creator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Creator's Hub
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Content Performance</h2>
            <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <RandomGraph />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Audience Insights</h2>
            <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <RandomBarGraph />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Link href="/dashboard/calendar">
            <CreatorFeatureCard title="Content Calendar" description="Plan and schedule your content" />
          </Link>
          <CreatorFeatureCard title="Collaboration Tools" description="Connect with other creators" />
          <CreatorFeatureCard title="Monetization Insights" description="Optimize your revenue streams" />
        </motion.div>
      </main>
    </div>
  )
}

function CreatorFeatureCard({ title, description }: { title: string; description: string }) {
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

function RandomGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate random data points
    const points = Array.from({ length: 20 }, () => Math.random() * 100);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style
    ctx.strokeStyle = '#8b5cf6'; // Purple color
    ctx.lineWidth = 2;
    
    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = (canvas.width / points.length) * index;
      const y = canvas.height - (point / 100) * canvas.height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
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

function RandomBarGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate random data points
    const bars = Array.from({ length: 8 }, () => Math.random() * 100);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = (canvas.width / bars.length) * 0.8;
    const spacing = (canvas.width / bars.length) * 0.2;
    
    bars.forEach((height, index) => {
      const x = (barWidth + spacing) * index;
      const barHeight = (height / 100) * canvas.height;
      const y = canvas.height - barHeight;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
      gradient.addColorStop(0, '#9333ea');  // Purple-600
      gradient.addColorStop(1, '#7e22ce');  // Purple-700
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
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

