import { Router } from "express";
import { EventRepositoryMongoose } from "../repositories/EventRepositoryMongoose";
import { EventController } from "../controllers/EventController";
import { EventUseCase } from "../useCases/EventUseCase";
import { upload } from '../infra/multer';

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
        this.router.post('/', upload.fields([
            {
                name: 'banner',
                maxCount: 1
            },
            {
                name: 'flyers',
                maxCount: 3
            }
        ]), this.eventConttoller.create.bind(this.eventConttoller));

        this.router.get('/', this.eventConttoller.findEventByLocation.bind(this.eventConttoller))
    }
}

export { EventRoutes };