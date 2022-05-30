import express from 'express'
import { getRentals, postRentals, finishRentals, deleteRentals } from '../controllers/rentalControllers.js'
const userRoutes = express.Router()

userRoutes.get('/rentals/', getRentals)
userRoutes.post('/rentals', postRentals)
userRoutes.post('/rentals/:id/return', finishRentals)
userRoutes.delete('/rentals/:id', deleteRentals)

export default userRoutes