import express from 'express'
import { getProfiles, createProfile, updateProfile, deleteProfile, getProfile, getProfilesByUser, getProfileByUser } from '../controllers/profile.js'

const router = express.Router()

// router.get('/', getProfiles)
router.post('/', createProfile)
router.get('/', getProfilesByUser)
router.get('/profile/', getProfileByUser)
router.get('/:id', getProfile)
router.patch('/:id', updateProfile)
router.delete('/:id', deleteProfile)


export default router
