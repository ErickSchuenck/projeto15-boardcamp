import express from 'express'
import { postGames, getGames } from '../controllers/categoriesController'
const userRoutes = express.Router()

userRoutes.post('/games', postGames)
userRoutes.get('/games', getGames)


export default userRoutes