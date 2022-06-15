import express from 'express'
import {
  getCompanyReferences,
  createCompanyReference,
  updateCompanyReference,
  deleteCompanyReference,
  getCompanyReferencesByCompany,
} from '../controllers/company-references.js'

const router = express.Router()

router.get('/', getCompanyReferences)
router.get('/company', getCompanyReferencesByCompany)
router.post('/', createCompanyReference)
router.patch('/:id', updateCompanyReference)
router.delete('/:id', deleteCompanyReference)

export default router
