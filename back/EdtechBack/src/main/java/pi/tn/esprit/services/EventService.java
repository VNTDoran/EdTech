package pi.tn.esprit.services;

import pi.tn.esprit.models.Event;

import java.util.List;

public interface EventService {

    List<Event> retrieveAllEvents();
    Event retrieveEvent(int eventId);
    Event addEvent(Event event);
    void removeEvent(int eventId);
    Event modifyEvent(Event event);


}