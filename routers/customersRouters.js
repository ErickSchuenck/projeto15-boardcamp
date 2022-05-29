import express from 'express'
import { getCustomers, getCustomersById, updateCustomer, postCustomers } from '../controllers/customerControllers.js'
const userRoutes = express.Router()

userRoutes.get('/customers', getCustomers)
userRoutes.get('/customers/:id', getCustomersById)
userRoutes.post('/customers', postCustomers)
userRoutes.put('/customers', updateCustomer)

export default userRoutes