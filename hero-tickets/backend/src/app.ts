import express, { Application } from 'express';
import { connect } from './infra/database';
import { errorMiddleware } from './middlewares/error.middleware';
import { EventRoutes } from './routes/event.routes';

class App {

    public app: Application;
    private eventRoutes = new EventRoutes();

    constructor() {
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionError();
        connect();
    }

    private interceptionError() {
        this.app.use(errorMiddleware)
    }

    private initializeRoutes() {
        this.app.use('/events', this.eventRoutes.router)
    }

    private middlewaresInitialize() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    listen() {
        this.app.listen(3333, () => console.log('server is running'))
    }
}

export { App }