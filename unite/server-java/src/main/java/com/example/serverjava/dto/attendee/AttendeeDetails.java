package com.example.serverjava.dto.attendee;

import java.time.LocalDateTime;

public record AttendeeDetails(String id, String name, String email, LocalDateTime createAt, LocalDateTime checkedInAt) {
}
