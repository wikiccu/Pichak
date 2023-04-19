import express from 'express'
import { clientUpload, getMeHandler, clientDownload, clientRequestForWaste } from '../../controllers/client.controller.js'
import { deserializeClient } from '../../middleware/deserializeClient.js'
import { requireUser } from '../../middleware/requireUser.js'
import { validate } from '../../middleware/validate.js'
import { clientRequestSchema } from '../../schema/client.schema.js'
const router = express.Router()
router.use(deserializeClient, requireUser)
// Get my info route
router.get('/me', getMeHandler)
router.post('/upload', clientUpload)
router.post('/requests/waste', validate(clientRequestSchema), clientRequestForWaste)
router.get('/files', clientDownload)
export default router
