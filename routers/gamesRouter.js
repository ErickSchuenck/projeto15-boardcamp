import express from 'express'
import { postGames, getGames } from '../controllers/gamesControllers.js'
import { gamesMiddleware } from '../middlewares/gamesMiddleware.js'
const userRoutes = express.Router()

userRoutes.post('/games', postGames)
userRoutes.get('/games', gamesMiddleware, getGames)


export default userRoutes