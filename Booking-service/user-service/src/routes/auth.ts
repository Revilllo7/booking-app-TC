import express from 'express'
import { registerUser, loginUser, getUserById } from '../controllers/authController'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserById)

router.get('/health', (req, res) => res.send('OK'));

export default router
