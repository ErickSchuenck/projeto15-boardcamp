import express from 'express'
import { getCustomers, getCustomersById, updateCustomer, postCustomers } from '../controllers/customerControllers.js'
import { updateCustomerMiddleware, customersMiddleware } from "./../middlewares/customersMiddleware";

const userRoutes = express.Router()

userRoutes.get('/customers', getCustomers)
userRoutes.get('/customers/:id', getCustomersById)
userRoutes.post('/customers', customersMiddleware, postCustomers)
userRoutes.put('/customers', updateCustomerMiddleware, updateCustomer)

export default userRoutes