import express from 'express'
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCompany,
} from '../controllers/articles.js'

const router = express.Router()

router.get('/', getArticles)
router.get('/company', getArticlesByCompany)
router.post('/', createArticle)
router.patch('/:id', updateArticle)
router.delete('/:id', deleteArticle)

export default router
