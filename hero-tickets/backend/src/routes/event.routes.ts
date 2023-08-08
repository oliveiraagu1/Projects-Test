import { Router } from "express";
import { EventRepositoryMongoose } from "../repositories/EventRepositoryMongoose";
import { EventController } from "../controllers/EventController";
import { EventUseCase } from "../useCases/EventUseCase";

class EventRoutes {

    public router: Router;
    private eventConttoller: EventController;
    constructor() {
        this.router = Router();
        const eventRepository = new EventRepositoryMongoose();
        const eventUseCase = new EventUseCase(eventRepository);
        this.eventConttoller = new EventController(eventUseCase);
        this.initRoutes();

    }

    initRoutes() {
        this.router.post('/', this.eventConttoller.create.bind(this.eventConttoller))
    }
}

export { EventRoutes };