import { Router } from 'express';

import { CreateUserController  } from './controllers/user/CreateUserService';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

// --- ROTAS USER --- //
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.put('/users', isAuthenticated, new UpdateUserController().handle);

// --- ROTAS HAIRCUT --- //
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle);

export { router };