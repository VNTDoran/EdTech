package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Club;

public interface ClubRepository extends JpaRepository<Club, Integer> {
}