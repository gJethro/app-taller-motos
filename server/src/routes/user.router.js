import express from 'express'
const router = express.Router()
import authRequired from '../middlewares/token.validation.js'
// import validate from '../middlewares/validator.middleware.js'

import {
  login,
  register,
  verifyToken,
  getUser,
  updateProfile,
  logout,
} from '../controllers/user.controller.js'

router.use(express.json())

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authRequired, logout)
router.get('/:num_doc', authRequired, getUser)
router.get('/verify', verifyToken)
router.put('/edit/:num_doc', authRequired, updateProfile)

export default router
