import axios from 'axios'

const BASE = 'https://api.rawg.io/api'

export const getHiddenGems = async ({ genres, tags }) => {
    const params = {
        key: process.env.RAWG_API_Key,
        genres: genres.join(','),
        tags: tags.join(','),
        ordering: '-rating',
        page_size: 20,
        metacritic: '60, 85' 
    }

    const res = await axios.get(`${BASE}/games`, { params })
    return res.data.results.filter(g => g.rating_count < 500)
}