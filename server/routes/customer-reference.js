import express from 'express'
import {
  getCustomerReferences,
  createCustomerReference,
  updateCustomerReference,
  deleteCustomerReference,
  getCustomerReferencesByCompany,
} from '../controllers/customer-references.js'

const router = express.Router()

router.get('/', getCustomerReferences)
router.get('/company', getCustomerReferencesByCompany)
router.post('/', createCustomerReference)
router.patch('/:id', updateCustomerReference)
router.delete('/:id', deleteCustomerReference)

export default router
