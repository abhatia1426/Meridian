import express from 'express'
import { getMoodAttributes, getGameReason } from '../services/geminiService.js'
import { getHiddenGems } from '../services/rawgService.js'
import { getPrices } from '../services/itadService.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/recommend', async (req, res) => {
  try {
    const { mood, maxBudget } = req.body
    if (!mood) return res.status(400).json({ error: 'Mood is required' })

    const attrs = await getMoodAttributes(mood)
    const games = await getHiddenGems({ genres: attrs.genres, tags: attrs.tags })

    const withPrices = await Promise.all(
      games.slice(0, 8).map(async (g) => {
        const [deals, why] = await Promise.all([
          getPrices(g.name),
          getGameReason(g.name, mood)
        ])
        const bestPrice = deals?.[0]?.price?.amount ?? null
        return {
          id: g.id,
          slug: g.slug,
          title: g.name,
          rating: g.rating,
          ratingsCount: g.ratings_count,
          cover: g.background_image,
          why,
          deals,
          bestPrice,
          withinBudget: maxBudget ? bestPrice <= maxBudget : true
        }
      })
    )

    res.json({
      attrs,
      curatorNote: attrs.curatorNote,
      games: withPrices.filter(g => g.withinBudget)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.post('/save/:slug', requireAuth, async (req, res) => {
  const user = req.user
  if (!user.savedGames.includes(req.params.slug)) {
    user.savedGames.push(req.params.slug)
    await user.save()
  }
  res.json({ saved: true })
})

router.post('/rate/:slug', requireAuth, async (req, res) => {
  const { rating } = req.body
  const user = req.user
  const existing = user.ratedGames.find(g => g.slug === req.params.slug)
  if (existing) {
    existing.rating = rating
  } else {
    user.ratedGames.push({ slug: req.params.slug, rating })
  }
  await user.save()
  res.json({ rated: true })
})

export default router