import express from 'express';
import { clientLoginHandler, loginHandler, logoutHandler, refreshAccessTokenHandler, clientRefreshAccessTokenHandler, registerHandler, registerWithOtpHandler } from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { clientLoginSchema, signupInputSchema } from '../schema/client.schema';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';
const router = express.Router();
// Register user route
router.post('/register/otp', validate(signupInputSchema), registerWithOtpHandler);
router.post('/register', validate(createUserSchema), registerHandler);
// Login user route
router.post('/login/client', validate(clientLoginSchema), clientLoginHandler);
router.post('/login', validate(loginUserSchema), loginHandler);
// Refresh access toke route
router.get('/refresh/client', clientRefreshAccessTokenHandler);
router.get('/refresh', refreshAccessTokenHandler);
router.use(deserializeUser, requireUser);
// Logout User
router.get('/logout', logoutHandler);
export default router;
