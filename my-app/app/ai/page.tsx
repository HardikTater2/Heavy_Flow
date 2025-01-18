'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AI() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const allRecommendations = [
    "Optimize your hashtag usage",
    "Collaborate with influencers in your niche",
    "Run targeted ad campaigns",
    "Create more short-form video content",
    "Personalize your content for different audience segments",
    "Engage with your audience through live streams",
    "Analyze your competitors' strategies",
    "Use data analytics to inform content strategy",
    "Create a consistent posting schedule",
    "Leverage user-generated content",
    "Experiment with different content formats",
    "Build a strong brand voice",
    "Focus on storytelling in your content",
    "Optimize your profile for discoverability",
    "Cross-promote across different platforms"
  ];

  // Get 7 random recommendations
  const getRandomRecommendations = () => {
    const shuffled = [...allRecommendations].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 7);
  };

  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    setRecommendations(getRandomRecommendations())
    setMounted(true)
  }, [])

  const handleQueryClick = (recommendation: string) => {
    // Transform the statement into a question
    let question = recommendation.toLowerCase();
    
    // Add appropriate question prefix based on the content
    if (question.startsWith('optimize') || question.startsWith('create') || 
        question.startsWith('build') || question.startsWith('leverage') ||
        question.startsWith('analyze') || question.startsWith('use')) {
      question = `How can I ${question}?`;
    } else if (question.startsWith('run') || question.startsWith('engage') ||
               question.startsWith('experiment') || question.startsWith('focus')) {
      question = `How should I ${question}?`;
    } else {
      question = `What's the best way to ${question}?`;
    }

    // Navigate to chat page with the transformed question
    router.push(`/ai/chat?query=${encodeURIComponent(question)}`);
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          AI-Powered Insights
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Recent Queries</h2>
            <ul className="space-y-2">
              {[
                "Tell me about current trends.",
                "Ideal sponsors for my content?",
                "How can I improve my marketing strategy?",
                "When should I post next week?",
                "Help me connect to a company.",
                "Help me increase my sales."
              ].map((query, index) => (
                <li 
                  key={index}
                  onClick={() => handleQueryClick(query)}
                  className="cursor-pointer hover:text-purple-400 transition-colors duration-200"
                >
                  {query}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li 
                  key={index}
                  onClick={() => handleQueryClick(recommendation)}
                  className="cursor-pointer hover:text-purple-400 transition-colors duration-200"
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <AIFeatureCard title="Smart Email" description="Let AI help you connect with potential partners" />
          <AIFeatureCard title="Content Analysis" description="Get insights on your content performance" />
          <AIFeatureCard title="Idea Generator" description="AI-powered content ideation" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link href="/ai/chat" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300 inline-block text-lg font-semibold">
            Chat with FlowAI
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

function AIFeatureCard({ title, description }: { title: string; description: string }) {
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

