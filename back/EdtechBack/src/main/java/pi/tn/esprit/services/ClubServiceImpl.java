package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Club;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.Event;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.repository.ClubRepository;
import pi.tn.esprit.repository.StudentRepository;
import pi.tn.esprit.repository.EventRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private StudentRepository etudiantRepository;

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
    public Club addClub(Club club) {
        if (club.getEtudiants() == null) {
            club.setEtudiants(new HashSet<>());
        }
        if (club.getEvents() == null) {
            club.setEvents(new HashSet<>());
        }
        {
            return clubRepository.save(club);
        }
    }

    @Override
    public void removeClub(int clubId) {
        clubRepository.deleteById(clubId);
    }

    @Override
    public Club modifyClub(Club club)
    {
        Club oldClub = clubRepository.findById(club.getId()).orElse(null);
        if (oldClub != null) {
            oldClub.setName(club.getName());
            oldClub.setDescription(club.getDescription());
            return clubRepository.save(oldClub);
        }
        return null;
    }

    @Override
    public void assignEtudiantToClub(int clubId, int etudiantId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        Student etudiant = etudiantRepository.findById(etudiantId).orElse(null);

        if (club != null && etudiant != null) {
            club.getEtudiants().add(etudiant);
            etudiant.setClub(club);
            etudiantRepository.save(etudiant);
        }
    }



    @Override
    public void deassignEtudiantFromClub(int clubId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        if (club != null) {
            club.setEtudiants(new HashSet<>());
            clubRepository.save(club);
        }

    }

    @Override
    public void assignEventToClub(int clubId, int eventId) {
        Club club = clubRepository.findById(clubId).orElse(null);
        Event event = eventRepository.findById(eventId).orElse(null);
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
            club.setEvents(new HashSet<>());
            clubRepository.save(club);
        }
    }

    @Override
    public List<Club> getAllClubsWithEventCount() {
        return clubRepository.findAll().stream()
                .map(club -> {
                    club.setEventCount(club.getEvents().size());
                    return club;
                })
                .collect(Collectors.toList());
    }
}