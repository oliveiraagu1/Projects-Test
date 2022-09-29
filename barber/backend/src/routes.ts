import { Router } from 'express';

import { CreateUserController  } from './controllers/user/CreateUserService';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

// --- ROTAS USER --- //
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

export { router };