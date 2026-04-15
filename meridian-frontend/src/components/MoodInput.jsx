import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecommendations } from '../services/api'

const CHIPS = [
  'chill', 'short sessions', 'story rich', 'pixel art',
  'multiplayer', 'relaxing', 'intense', 'open world',
  'puzzle', 'indie', 'horror', 'co-op', 'retro', 'atmospheric'
]

const PLACEHOLDERS = [
  'Something chill to wind down after work...',
  'A short game I can finish this weekend...',
  'Relaxing but still engaging, under $10...',
  'Intense multiplayer with friends...',
  'A hidden gem with a great story...',
  'Something like Stardew Valley but different...'
]

const THINKING_MESSAGES = [
  'Reading your vibe...',
  'Searching hidden gems...',
  'Checking prices...',
  'Curating your list...'
]

export default function MoodInput() {
  const [mood, setMood] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [thinkingMsg, setThinkingMsg] = useState('')
  const [selectedChips, setSelectedChips] = useState([])
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0])
  const navigate = useNavigate()

  // Cycle placeholders
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % PLACEHOLDERS.length
      setPlaceholder(PLACEHOLDERS[i])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Cycle thinking messages while loading
  useEffect(() => {
    if (!loading) return
    let i = 0
    setThinkingMsg(THINKING_MESSAGES[0])
    const interval = setInterval(() => {
      i = (i + 1) % THINKING_MESSAGES.length
      setThinkingMsg(THINKING_MESSAGES[i])
    }, 1500)
    return () => clearInterval(interval)
  }, [loading])

  const toggleChip = (chip) => {
    setSelectedChips(prev => {
      const already = prev.includes(chip)
      const updated = already ? prev.filter(c => c !== chip) : [...prev, chip]
      const chipText = updated.join(', ')
      // keep any free text the user typed, append chips
      const base = mood.replace(/,?\s*(chill|short sessions|story rich|pixel art|multiplayer|relaxing|intense|open world|puzzle|indie|horror|co-op|retro|atmospheric)/gi, '').trim()
      setMood(base ? `${base}, ${chipText}` : chipText)
      return updated
    })
  }

  const handleSubmit = async () => {
    if (!mood.trim()) return
    setLoading(true)
    try {
      const res = await getRecommendations(mood, budget ? parseFloat(budget) : null)
      navigate('/results', { state: { games: res.data.games, attrs: res.data.attrs, curatorNote: res.data.curatorNote } })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => toggleChip(chip)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              selectedChips.includes(chip)
                ? 'border-meridian-accent bg-meridian-accent text-white'
                : 'border-meridian-600 text-gray-400 hover:border-meridian-accent hover:text-white'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={mood}
        onChange={e => setMood(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        className="w-full bg-meridian-700 border border-meridian-600 text-white placeholder-gray-500 rounded-xl px-5 py-4 text-sm resize-none h-28 focus:outline-none focus:border-meridian-accent transition disabled:opacity-50"
      />

      {/* Budget + submit */}
      <div className="flex gap-3">
        <input
          type="number"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          placeholder="Max budget (optional, $)"
          disabled={loading}
          className="flex-1 bg-meridian-700 border border-meridian-600 text-white placeholder-gray-500 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-meridian-accent transition disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !mood.trim()}
          className="bg-meridian-accent hover:bg-meridian-accentHover disabled:opacity-50 text-white px-8 py-3 rounded-xl text-sm font-medium transition min-w-[120px]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {thinkingMsg}
            </span>
          ) : 'Find Games'}
        </button>
      </div>
    </div>
  )
}