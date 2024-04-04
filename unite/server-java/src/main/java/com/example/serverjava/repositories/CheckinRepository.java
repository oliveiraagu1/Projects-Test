package com.example.serverjava.repositories;

import com.example.serverjava.domain.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckinRepository extends JpaRepository<Event, Integer> {
}
