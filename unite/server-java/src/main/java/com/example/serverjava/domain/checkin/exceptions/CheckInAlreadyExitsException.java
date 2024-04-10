package com.example.serverjava.domain.checkin.exceptions;

public class CheckInAlreadyExitsException extends RuntimeException {
    public CheckInAlreadyExitsException(String message){
        super(message);
    }
}
