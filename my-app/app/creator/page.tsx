'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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
              <p className="text-gray-400">Performance chart coming soon!</p>
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
              <p className="text-gray-400">Audience demographics coming soon!</p>
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

