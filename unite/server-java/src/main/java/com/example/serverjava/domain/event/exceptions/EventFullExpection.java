package com.example.serverjava.domain.event.exceptions;

public class EventFullExpection extends RuntimeException{
    public EventFullExpection(String message){
        super(message);
    }
}
