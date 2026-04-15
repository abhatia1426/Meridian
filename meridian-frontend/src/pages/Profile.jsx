import { useEffect, useState } from 'react'
import { getMe } from '../services/api'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-[85vh]">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Sign in to view your profile
          </p>
          <a
            href="http://localhost:3001/auth/google"
            className="bg-meridian-accent hover:bg-meridian-accentHover text-white px-6 py-3 rounded-xl text-sm transition"
          >
            Sign in with Google
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.avatar}
          className="w-14 h-14 rounded-full"
          alt={user.name}
        />
        <div>
          <h2 className="text-white font-medium">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="bg-meridian-800 border border-meridian-600 rounded-2xl p-5">
        <h3 className="text-white text-sm font-medium mb-3">Saved games</h3>

        {user.savedGames.length === 0 ? (
          <p className="text-gray-500 text-xs">No saved games yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {user.savedGames.map(slug => (
              <li key={slug} className="text-gray-400 text-sm">
                {slug}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}