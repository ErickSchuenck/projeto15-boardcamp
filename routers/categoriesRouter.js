import express from 'express'
import { postCategories, getCategories } from '../controllers/categoriesControllers'
const userRoutes = express.Router()

userRoutes.post('/categories', postCategories)
userRoutes.get('/categories', getCategories)

export default userRoutes