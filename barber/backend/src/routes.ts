import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserService";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

import { CheckSubscriptionController } from "./controllers/subscription/CheckSubscriptionController";

import { isAuthenticated } from "./middleware/isAuthenticated";

const router = Router();

// --- ROTAS USER --- //
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// --- ROTAS HAIRCUT --- //
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
router.get("/haircut/count", isAuthenticated, new CountHaircutsController().handle);
router.get("/haircut/detail", isAuthenticated, new DetailHaircutController().handle);

// --- ROTAS SUBSCRIPTION --- //
router.get("/check", isAuthenticated, new CheckSubscriptionController().handle);

export { router };
