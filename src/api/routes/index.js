import express from 'express'
import v1 from './v1/index.js'
const router = express.Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'))
router.use('/v1', v1)

export default router
