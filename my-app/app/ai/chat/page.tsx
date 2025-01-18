'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function AIChat() {
  const searchParams = useSearchParams();
  // State to manage chat messages
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for API requests
  const [isGenerating, setIsGenerating] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setInput(query);
      // Optional: Automatically submit the query
      handleSubmit(new Event('submit') as any);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user input to the message list
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsGenerating(true);
    abortController.current = new AbortController();

    try {
      // Make API call to Ollama
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: input,
          system: "You are FlowAI, a helpful and concise AI assistant based on Llama2. Provide direct, clear answers without metacommentary. Keep responses natural but brief.",
          temperature: 0.7,
          top_k: 50,
          top_p: 0.9,
          stop: ["Human:", "Assistant:", "</s>"],
        }),
        signal: abortController.current.signal,
      });

      const reader = response.body?.getReader();
      let aiResponse = '';
      
      // Remove any existing empty AI messages
      setMessages((prev) => prev.filter(msg => msg.content !== ''));
      
      // Add initial AI message
      setMessages((prev) => [...prev, { role: 'ai', content: '' }]);
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const text = new TextDecoder().decode(value);
          const lines = text.split('\n').filter(Boolean);
          
          for (const line of lines) {
            try {
              const json = JSON.parse(line);
              aiResponse += json.response;
              // Update the last message with new content
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: 'ai', content: aiResponse }
              ]);
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setMessages((prev) => prev.filter(msg => msg.content !== ''));
      } else {
        console.error('Error:', error);
        setMessages((prev) => [
          ...prev,
          { role: 'ai', content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` },
        ]);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    abortController.current?.abort();
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <main className="p-8">
        {/* Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Chat with FlowAI
        </motion.h1>

        {/* Chatbox */}
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Message Display Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-purple-700 ml-auto' : 'bg-gray-700'
                } max-w-[80%] ${message.role === 'user' ? 'ml-auto' : ''}`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <div className="relative">
                    <div className="text-xs text-gray-400 mb-1">FlowAI</div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.content === '' && (
                      <div className="flex space-x-2 mt-2">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2, repeatDelay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4, repeatDelay: 0.2 }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask FlowAI anything..."
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {isGenerating ? (
              <button
                onClick={handleStop}
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
