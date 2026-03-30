import axios from 'axios'

const BASE = 'https://api.isthereanydeal.com'

export const getPrices = async (gameTitle) => {
  const search = await axios.get(`${BASE}/games/search/v1`, {
    params: { key: process.env.ITAD_API_KEY, title: gameTitle, results: 1 }
  })
  if (!search.data.length) return null
  const gameId = search.data[0].id

  const prices = await axios.get(`${BASE}/games/prices/v2`, {
    params: { key: process.env.ITAD_API_KEY, id: gameId, country: 'US' }
  })
  return prices.data[0]?.deals?.slice(0, 3) ?? []
}