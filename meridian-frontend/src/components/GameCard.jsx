import { useState } from 'react'
import PriceTag from './PriceTag'
import { saveGame, rateGame } from '../services/api'

export default function GameCard({ game }) {
  const [saved, setSaved] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSave = async () => {
    try {
      await saveGame(game.slug)
      setSaved(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRate = async (r) => {
    try {
      await rateGame(game.slug, r)
      setRating(r)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-meridian-800 border border-meridian-600 rounded-2xl overflow-hidden hover:border-meridian-accent transition">
      {game.cover && (
        <img src={game.cover} alt={game.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-medium text-sm">{game.title}</h3>
          <span className="text-xs text-gray-500">{game.ratingsCount} ratings</span>
        </div>
        <p className="text-xs text-gray-400 italic">{game.why}</p>
        <PriceTag deals={game.deals} />
        <div className="flex justify-between items-center pt-1">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-400 transition`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleSave}
            className={`text-xs px-3 py-1 rounded-lg border transition ${
              saved
                ? 'border-meridian-accent text-meridian-accent'
                : 'border-gray-600 text-gray-400 hover:border-meridian-accent hover:text-meridian-accent'
            }`}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}