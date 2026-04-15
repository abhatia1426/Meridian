import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true
})

export const getRecommendations = (mood, maxBudget) =>
  api.post('/games/recommend', { mood, maxBudget })

export const saveGame = (slug) =>
  api.post(`/games/save/${slug}`)

export const rateGame = (slug, rating) =>
  api.post(`/games/rate/${slug}`, { rating })

export const getMe = () =>
  api.get('/auth/me')

export const getPrices = (title) =>
  api.get(`/prices/${title}`)

export default api