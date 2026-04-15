import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMe } from '../services/api'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return (
    <nav className="flex items-center justify-between px-5 py-4 bg-meridian-800 border-b border-meridian-600">
      <Link to="/" className="text-lg font-semibold tracking-wide text-white">
        Meridian
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="hidden sm:block text-sm text-gray-400 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/profile"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Profile
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              className="w-8 h-8 rounded-full"
              alt={user.name}
            />
            <a
              href="http://localhost:3001/auth/logout"
              className="hidden sm:block text-sm text-gray-400 hover:text-white transition"
            >
              Logout
            </a>
          </div>
        ) : (
          <a
            href="http://localhost:3001/auth/google"
            className="text-xs bg-meridian-accent hover:bg-meridian-accentHover text-white px-3 py-2 rounded-lg transition"
          >
            Sign in
          </a>
        )}
      </div>
    </nav>
  )
}