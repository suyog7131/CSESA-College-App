package com.csesa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csesa.backend.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}