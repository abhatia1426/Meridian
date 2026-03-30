import express from 'express'
import { getPrices } from '../services/itadSevice.js'

const router = express.Router()

router.get('/:title',  async (req, res) => {
    try {
        const deals = await getPrices(req.params.title)
        res.json({ deals })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Could not fetch prices '})
    }
})

export default router