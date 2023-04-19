import express from 'express'
import authRoute from './auth.route.js'
import clientRoute from './client.route.js'
import userRoute from './user.route.js'
const router = express.Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'))
router.get('/auth', authRoute)
router.get('/client', clientRoute)
router.get('/user', userRoute)

export default router
