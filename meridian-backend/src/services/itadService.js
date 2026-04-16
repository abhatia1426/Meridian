import axios from 'axios'

const BASE = 'https://www.cheapshark.com/api/1.0'

export const getPrices = async (gameTitle) => {
  try {
    const res = await axios.get(`${BASE}/deals`, {
      params: {
        title: gameTitle,
        limit: 3,
        sortBy: 'Price'
      }
    })

    return res.data.map(deal => ({
      shop: { name: deal.storeName ?? 'Store' },
      price: { amount: parseFloat(deal.salePrice) },
      url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
    }))
  } catch (err) {
    console.error(`CheapShark error for ${gameTitle}:`, err.message)
    return []
  }
}