import express from 'express'
import {
  getUsers,
  signin,
  signup,
  forgotPassword,
  resetPassword,
  updateUserName,
} from '../controllers/user.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/signin', signin)
router.post('/signup', signup)
router.post('/forgot', forgotPassword)
router.post('/reset', resetPassword)
router.patch('/:id', updateUserName)

export default router
