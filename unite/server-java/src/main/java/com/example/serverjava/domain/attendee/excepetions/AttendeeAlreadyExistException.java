package com.example.serverjava.domain.attendee.excepetions;

public class AttendeeAlreadyExistException extends RuntimeException {
    public AttendeeAlreadyExistException(String message){
        super(message);
    }
}
