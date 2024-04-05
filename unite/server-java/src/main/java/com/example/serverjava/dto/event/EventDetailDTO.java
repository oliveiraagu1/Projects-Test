package com.example.serverjava.dto.event;

public record EventDetailDTO(String id,
                             String title,
                             String details,
                             String slug,
                             Integer maximumAttendees,

                             Integer attendeesAmount
) {
}
