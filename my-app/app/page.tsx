import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-4">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Heavy Flow</span>
      </h1>
      <p className="text-xl mb-8">
        Empowering Content Creation with Real-Time AI-Driven Marketing
      </p>
      <div className="space-x-4">
        <Link href="/login" className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 inline-block">
          Log in
        </Link>
        <Link href="/signup" className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition duration-300 inline-block">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

