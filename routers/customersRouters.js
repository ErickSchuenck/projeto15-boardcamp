import express from 'express'
import { getCustomers, getCustomersById, updateCustomer, postCustomers } from '../controllers/customerControllers.js'
import { updateCustomersMiddleware, customersMiddleware } from "./../middlewares/customersMiddleware.js";

const userRoutes = express.Router()

userRoutes.get('/customers', getCustomers)
userRoutes.get('/customers/:id', getCustomersById)
userRoutes.post('/customers', customersMiddleware, postCustomers)
userRoutes.put('/customers/:id', updateCustomersMiddleware, updateCustomer)

export default userRoutes