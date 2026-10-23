package com.csesa.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.csesa.backend.model.Event;
import com.csesa.backend.model.TeamMember;
import com.csesa.backend.repository.EventRepository;
import com.csesa.backend.repository.TeamMemberRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Override
    public void run(String... args) {

        Event e1 = new Event();
        e1.setTitle("CodeQuiz Blitz 2025");
        e1.setDate("May 10, 2025");
        e1.setDescription("A fast-paced code quiz covering DSA, OOP and web dev");
        e1.setCategory("Technical");
        e1.setVenue("CS Lab 101");
        e1.setCoordinator("Arjun Mehta");
        e1.setPrize("5000 Prize Pool");
        eventRepository.save(e1);

        Event e2 = new Event();
        e2.setTitle("HackSprint 24hr Hackathon");
        e2.setDate("June 1-2, 2025");
        e2.setDescription("Build a working prototype in 24 hours");
        e2.setCategory("Technical");
        e2.setVenue("Innovation Hub");
        e2.setCoordinator("Priya Sharma");
        e2.setPrize("15000 Prize Pool");
        eventRepository.save(e2);

        Event e3 = new Event();
        e3.setTitle("Web Dev Workshop");
        e3.setDate("May 20, 2025");
        e3.setDescription("Hands-on React and Node.js workshop for beginners");
        e3.setCategory("Workshop");
        e3.setVenue("Seminar Hall A");
        e3.setCoordinator("Sneha Patil");
        e3.setPrize("Certificate");
        eventRepository.save(e3);

        Event e4 = new Event();
        e4.setTitle("AI/ML Industry Seminar");
        e4.setDate("May 28, 2025");
        e4.setDescription("Industry experts talk about AI and ML careers");
        e4.setCategory("Seminar");
        e4.setVenue("Main Auditorium");
        e4.setCoordinator("Rahul Desai");
        e4.setPrize("Certificate");
        eventRepository.save(e4);

        TeamMember t1 = new TeamMember();
        t1.setName("Rahul Sharma");
        t1.setRole("President");
        t1.setYear("Final Year");
        t1.setEmoji("👨‍💻");
        teamMemberRepository.save(t1);

        TeamMember t2 = new TeamMember();
        t2.setName("Priya Patil");
        t2.setRole("Vice President");
        t2.setYear("Final Year");
        t2.setEmoji("👩‍💻");
        teamMemberRepository.save(t2);

        TeamMember t3 = new TeamMember();
        t3.setName("Amit Desai");
        t3.setRole("Technical Head");
        t3.setYear("Third Year");
        t3.setEmoji("👨‍🔬");
        teamMemberRepository.save(t3);

        TeamMember t4 = new TeamMember();
        t4.setName("Sneha Kulkarni");
        t4.setRole("Event Manager");
        t4.setYear("Third Year");
        t4.setEmoji("👩‍🎨");
        teamMemberRepository.save(t4);
    }
}