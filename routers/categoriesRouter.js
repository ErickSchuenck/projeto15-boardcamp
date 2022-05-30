import express from 'express'
import { postCategories, getCategories } from '../controllers/categoriesControllers.js'
import { categoriesMiddleware } from "./../middlewares/categoriesMiddleware.js";

const userRoutes = express.Router()

userRoutes.post('/categories', categoriesMiddleware, postCategories)
userRoutes.get('/categories', getCategories)

export default userRoutes