package com.example.serverjava.services;

import com.example.serverjava.domain.attendee.Attendee;
import com.example.serverjava.domain.event.Event;
import com.example.serverjava.domain.event.exceptions.EventFullExpection;
import com.example.serverjava.domain.event.exceptions.EventNotFoundException;
import com.example.serverjava.dto.attendee.AttendeeIdDTO;
import com.example.serverjava.dto.attendee.AttendeeRequestDTO;
import com.example.serverjava.dto.event.EventIdDTO;
import com.example.serverjava.dto.event.EventRequestDTO;
import com.example.serverjava.dto.event.EventResponseDTO;
import com.example.serverjava.repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final AttendeeService attendeeService;

    public EventResponseDTO getEventDetail(String eventId) {
        Event event = this.getEventById(eventId);
        List<Attendee> attendeeList = this.attendeeService.getAllAttendeeFromEvent(eventId);
        return new EventResponseDTO(event, attendeeList.size());
    }

    public EventIdDTO createEvent(EventRequestDTO eventDTO){
        Event newEvent = new Event();

        newEvent.setTitle(eventDTO.title());
        newEvent.setDetails(eventDTO.details());
        newEvent.setMaximumAttendees(eventDTO.maximumAttendees());
        newEvent.setSlug(this.createSlug(eventDTO.title()));

        this.eventRepository.save(newEvent);
        return new EventIdDTO(newEvent.getId());
    }

    public AttendeeIdDTO registerAttendeeOnEvent(String eventId, AttendeeRequestDTO attendeeRequestDTO) {
        this.attendeeService.verifyAttendeeSubscription(attendeeRequestDTO.email(), eventId);

        Event event = this.getEventById(eventId);
        List<Attendee> attendeeList = this.attendeeService.getAllAttendeeFromEvent(eventId);

        if(event.getMaximumAttendees() <= attendeeList.size()) throw new EventFullExpection("Event is full!");

        Attendee newAttendee = new Attendee();
        newAttendee.setName(attendeeRequestDTO.name());
        newAttendee.setEmail(attendeeRequestDTO.email());
        newAttendee.setEvent(event);
        newAttendee.setCreatedAt(LocalDateTime.now());

        this.attendeeService.registerAttendee(newAttendee);

        return new AttendeeIdDTO(newAttendee.getId());
    }

    private Event getEventById(String eventId){
       return this.eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException(("Event not found with Id: " + eventId)));
    }


    public String createSlug(String slug) {
        String normalized = Normalizer.normalize(slug, Normalizer.Form.NFD);
        return normalized.replaceAll("[\\p{InCOMBINING_DIACRITICAL_MARKS}]", "")
                .replaceAll("[^\\w\\s]", "")
                .replaceAll("\\s+","-")
                .toLowerCase();
    }

}
