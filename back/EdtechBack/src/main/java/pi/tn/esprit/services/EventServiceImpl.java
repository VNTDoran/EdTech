package pi.tn.esprit.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Event;
import pi.tn.esprit.models.Etudiant;
import pi.tn.esprit.models.Club;
import pi.tn.esprit.repository.EtudiantRepository;
import pi.tn.esprit.repository.EventRepository;
import pi.tn.esprit.repository.ClubRepository;
import java.util.List;
@Service

public class EventServiceImpl implements EventService{

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EventRepository eventRepository;
    @Override
    public List<Event> retrieveAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event retrieveEvent(int eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }


    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void removeEvent(int eventId) {
        eventRepository.deleteById(eventId);
    }


    @Override
    public Event modifyEvent(Event event){
        Event oldEvent = eventRepository.findById(event.getId()).orElse(null);
        if (oldEvent != null) {
            oldEvent.setName(event.getName());
            oldEvent.setDate(event.getDate());
            return eventRepository.save(oldEvent);
        } else {
            return null;
        }
    }
}
