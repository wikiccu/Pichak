import express from 'express'
import authRoute from './auth.routes.js'
const router = express.Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'))
router.get('/auth', authRoute)

export default router
