package pi.tn.esprit.controllers;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Event;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.EventService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Web Services for Event Management")
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all events")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Event>> retrieveAllEvents(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Event> events = eventService.retrieveAllEvents();
            return ResponseEntity.ok().body(events);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific event by ID")
    @GetMapping("/retrieve/{eventId}")
    public ResponseEntity<Event> retrieveEvents(@PathVariable int eventId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Event event = eventService.retrieveEvent(eventId);
            if (event != null) {
                return ResponseEntity.ok().body(event);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @Operation(description = "Adds a new event")
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event, HttpServletRequest request) {
        if (event.getDate().before(new Date())) {
            return ResponseEntity.badRequest().build();
        }
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Event addedEvent = eventService.addEvent(event);
            return ResponseEntity.ok().body(addedEvent);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes an event by ID")
    @DeleteMapping("/remove/{eventId}")
    public ResponseEntity<Void> removeEvent(@PathVariable int eventId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            eventService.removeEvent(eventId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Modifies an existing event")
    @PutMapping("/modify")
    public ResponseEntity<Event> modifyEvent(@RequestBody Event event, HttpServletRequest request) {
        if (event.getDate().before(new Date())) {
            return ResponseEntity.badRequest().build();
        }
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Event modifiedEvent = eventService.modifyEvent(event);
            return ResponseEntity.ok().body(modifiedEvent);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}