import { useLocation, useNavigate } from 'react-router-dom'
import GameCard from '../components/GameCard'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.games) {
    navigate('/')
    return null
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">Your recommendations</h2>
        {state.curatorNote && (
          <div className="mt-3 px-4 py-3 bg-meridian-700 border border-meridian-600 rounded-xl inline-block">
            <p className="text-sm text-gray-300 italic">"{state.curatorNote}"</p>
          </div>
        )}
      </div>
      {state.games.length === 0 ? (
        <p className="text-gray-500 text-sm">No games found. Try a different mood or budget.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {state.games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className="mt-10 text-sm text-gray-400 hover:text-white transition"
      >
        ← Search again
      </button>
    </main>
  )
}