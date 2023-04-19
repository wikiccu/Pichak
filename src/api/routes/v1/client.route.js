import express from 'express';
import { clientUpload, getMeHandler, clientDownload, clientRequestForWaste } from '../controllers/client.controller';
import { deserializeClient } from '../middleware/deserializeClient';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { clientRequestSchema } from '../schema/client.schema';
const router = express.Router();
router.use(deserializeClient, requireUser);
// Get my info route
router.get('/me', getMeHandler);
router.post('/upload', clientUpload);
router.post('/requests/waste', validate(clientRequestSchema), clientRequestForWaste);
router.get('/files', clientDownload);
export default router;
