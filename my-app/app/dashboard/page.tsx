'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import EventCalendar from '../components/EventCalendar'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem'
  }
  
  const center = {
    lat: 0,
    lng: 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Welcome Back, User!
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Trend Diversity</h2>
            <div className="bg-gray-700 h-64 rounded-lg mb-4 overflow-hidden">
              <img 
                src="/dashboard/world.png" 
                alt="World Map"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Content Calendar</h2>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <EventCalendar />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">#WeAreHim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <StatCard title="Active Creators" value="200,000+" />
            <StatCard title="Companies Curated" value="3,000+" />
            <StatCard title="Engaged Creators" value="750,000+" />
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-700 p-4 rounded-lg"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-3xl text-purple-400">{value}</p>
    </motion.div>
  )
}

