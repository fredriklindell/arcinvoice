import express from 'express'
import {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompaniesByUser,
  getCompanyByUser,
} from '../controllers/companies.js'

const router = express.Router()

router.post('/', createCompany)
router.get('/', getCompaniesByUser)
router.get('/user/', getCompanyByUser)
router.get('/:id', getCompany)
router.patch('/:id', updateCompany)
router.delete('/:id', deleteCompany)

export default router
