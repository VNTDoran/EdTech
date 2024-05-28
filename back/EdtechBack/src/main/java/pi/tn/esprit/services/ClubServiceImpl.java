package pi.tn.esprit.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Club;
import pi.tn.esprit.models.Etudiant;
import pi.tn.esprit.models.Event;
import pi.tn.esprit.repository.ClubRepository;
import pi.tn.esprit.repository.EtudiantRepository;
import pi.tn.esprit.repository.EventRepository;
import java.util.List;
import java.util.Set;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Club> retrieveAllClubs() {
        return clubRepository.findAll();
    }

    @Override
    public Club retrieveClub(int clubId) {
        return clubRepository.findById(clubId).orElse(null);
    }

    @Override
    public Club addClub(Club club)
    {
        return clubRepository.save(club);
    }

    @Override
    public void removeClub(int clubId) {
clubRepository.deleteById(clubId);
    }

    @Override
    public Club modifyClub(Club club)
    {
        Club oldClub = clubRepository.findById(club.getId()).get();
        oldClub.setName(club.getName());
        return clubRepository.save(oldClub);
    }

    @Override
    public void assignEtudiantToClub(int clubId, int etudiantId) {
        Club club = clubRepository.findById(clubId).orElse(null);
       Etudiant etudiant = etudiantRepository.findById(etudiantId).orElse(null);
        System.out.println(club.getName());
        System.out.println(etudiant.getName());

        if (club != null && etudiant != null) {
            club.getEtudiants().add(etudiant);
            etudiant.setClub(club);
        etudiantRepository.save(etudiant);
    }}



    @Override
    public void deassignEtudiantFromClub(int clubId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        if (club != null) {
            club.setEtudiants(null);
            clubRepository.save(club);
        }

    }

    @Override
    public void assignEventToClub(int clubId, int eventId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        Event event = eventRepository.findById(eventId).orElse(null);
        System.out.println(club.getName());
        System.out.println(event.getName());

        if (club != null && event != null) {
            club.getEvents().add(event);
            event.setClub(club);
            eventRepository.save(event);
        }
    }
    @Override
    public void deassignEventFromClub(int clubId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        if (club != null) {
            club.setEvents(null);
            clubRepository.save(club);
        }
    }
}
