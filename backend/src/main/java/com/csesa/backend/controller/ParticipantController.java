package com.csesa.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csesa.backend.model.Participant;
import com.csesa.backend.repository.ParticipantRepository;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "*")
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/event/{eventId}")
    public List<Participant> getByEvent(@PathVariable Long eventId) {
        return participantRepository.findByEventId(eventId);
    }

    @PostMapping
    public Participant register(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }
}