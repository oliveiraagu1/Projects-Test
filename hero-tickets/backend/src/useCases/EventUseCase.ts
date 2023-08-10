import { Event } from "../entities/Event";
import { EventRepository } from "../repositories/EventRepository";
import { HttpException } from '../interfaces/HttpException';

class EventUseCase {
    constructor(private eventRepository: EventRepository) {
    }

    async create(eventData: Event) {

        if (!eventData.banner) throw new HttpException(400, 'Banner is required')

        if (!eventData.flyers) throw new HttpException(400, 'Flyers is required')

        if (!eventData.location) throw new HttpException(400, 'Location is required')


        const cityName = getCityNameByCoordinates(
            eventData.location.latitude,
            eventData.location.longitude
        )


        const result = await this.eventRepository.add(eventData);
        return result;
    }

    private getCityNameByCoordinates(latitude, longitude){
        
    }
}

export { EventUseCase };