import express from 'express'
import authRoute from './auth.route.js'
import clientRoute from './client.route.js'
import userRoute from './user.route.js'
const router = express.Router()

router.use('/auth', authRoute)
router.use('/client', clientRoute)
router.use('/user', userRoute)

export default router
