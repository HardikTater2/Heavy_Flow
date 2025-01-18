'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          About Heavy Flow
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
        >
          <p className="mb-4">
            Heavy Flow is a cutting-edge platform designed to empower content creators and marketers with AI-driven insights and tools. Our mission is to revolutionize the way creators connect with their audience and optimize their content strategy.
          </p>
          <p className="mb-4">
            Founded in 2023, Heavy Flow has quickly become a leader in the content creation and marketing space, serving over 200,000 active creators and helping them engage with more than 750,000 audience members.
          </p>
          <p>
            Our team of experts in AI, marketing, and content creation work tirelessly to provide you with the most innovative and effective tools to grow your online presence and maximize your impact.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <AboutFeatureCard title="Our Vision" description="To create a world where every creator can thrive and make a lasting impact." />
          <AboutFeatureCard title="Our Mission" description="To provide innovative, AI-powered tools that empower creators to reach their full potential." />
          <AboutFeatureCard title="Our Values" description="Innovation, Integrity, Collaboration, and User-Centric Design" />
        </motion.div>
      </main>
    </div>
  )
}

function AboutFeatureCard({ title, description }: { title: string; description: string }) {
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

