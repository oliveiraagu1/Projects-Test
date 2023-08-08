import request from 'supertest';
import { App } from '../app';
const app = new App().app;
import { Event } from '../entities/Event';
describe('Event test', () => {

    it('/POST Event', async () => {
        const event = {
            title: 'Jorge e Mateus',
            price: [{ sector: 'Pista', amount: '20' }],
            description: 'Evento descrição',
            city: 'Belo Horizonte',
            location: {
                latitude: '-19.8658619',
                longitude: '-43.9737064',
            },
            coupons: [],
            date: new Date(),
            participants: [],
        }

        const response = await request(app).post('/events').field('title', event.title).attach('banner', '/Users');
    })
})