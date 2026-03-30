import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';
import priceRoutes from './routes/prices.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/games', gameRoutes);
app.use('/prices', priceRoutes);

mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('Connected to MongoDB'))
    .catch(err=> console.error(err))

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on port ${process.env.PORT || 3001}');
})