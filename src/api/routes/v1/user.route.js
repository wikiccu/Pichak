import express from 'express';
import { getAllUsersHandler, approveUserByAdmin, getMeHandler, approveClientsByAdmins } from '../../controllers/user.controller.js';
import { deserializeUser } from '../../middleware/deserializeUser.js';
import { requireUser } from '../../middleware/requireUser.js';
import { restrictTo } from '../../middleware/restrictTo.js';
import { validate } from '../../middleware/validate.js';
import { approveSchema } from '../../schema/user.schema.js';
const router = express.Router();
router.use(deserializeUser, requireUser);
// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);
router.post('/approve/user', restrictTo('admin'), validate(approveSchema), approveUserByAdmin);
router.post('/approve/client', restrictTo('admin', 'user'), validate(approveSchema), approveClientsByAdmins);
// Get my info route
router.get('/me', getMeHandler);
export default router;
