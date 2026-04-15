import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  avatar: String,
  savedGames: [{ type: String }],
  ratedGames: [{
    slug: String,
    rating: Number,
    ratedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

export default mongoose.model('User', userSchema)