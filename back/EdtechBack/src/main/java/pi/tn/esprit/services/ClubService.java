package pi.tn.esprit.services;

import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Club;

import java.util.List;

public interface ClubService {

    List<Club> retrieveAllClubs();
    Club retrieveClub(int clubId);
    Club addClub(Club club);
    void removeClub(int clubId);
    Club modifyClub(Club club);
    void assignEtudiantToClub(int clubId, int etudiantId);

    void deassignEtudiantFromClub(int clubId);
    void assignEventToClub(int clubId, int eventId);

    void deassignEventFromClub(int clubId);
}