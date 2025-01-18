'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function Header() {
  console.log('Header component rendering started');
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/ai', label: 'AI' },
    { href: '/creator', label: 'Creator' },
    { href: '/marketing', label: 'Marketing' },
    { href: '/about', label: 'About' },
  ]
  console.log('Header component loaded');
  console.log('Current pathname:', pathname);

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/dashboard" className="text-2xl font-bold text-white hover:text-purple-400 transition duration-300">
          Heavy Flow
        </Link>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="relative">
                <span className={`hover:text-purple-400 transition duration-300 ${
                  pathname === link.href ? 'text-purple-400' : 'text-white'
                }`}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400"
                    layoutId="underline"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

