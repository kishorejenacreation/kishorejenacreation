"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full relative overflow-hidden px-6 py-4 flex justify-between items-center text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-purple-900 animate-gradient-shine -z-10"></div>

      {/* Optional floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-white rounded-full absolute animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <Link href="/" className="text-xl font-bold relative z-10">
        Kishore Jena Creation
      </Link>

      <nav className="space-x-4 relative z-10">
        <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
        <Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link>
        <Link href="/spin-game" className="hover:text-yellow-400 transition-colors">Game</Link>
        <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
        {user ? (
          <button
            onClick={logout}
            className="bg-white text-purple-900 px-3 py-1 rounded hover:bg-yellow-200 transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-white text-purple-900 px-3 py-1 rounded hover:bg-yellow-200 transition-colors"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient-shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shine {
          background-size: 200% 200%;
          animation: gradient-shine 8s ease infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite;
        }
      `}</style>
    </header>
  );
}
