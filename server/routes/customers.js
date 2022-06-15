import express from 'express'
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersByCompany,
} from '../controllers/customers.js'

const router = express.Router()

router.get('/', getCustomers)
router.get('/company', getCustomersByCompany)
router.post('/', createCustomer)
router.patch('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

export default router
