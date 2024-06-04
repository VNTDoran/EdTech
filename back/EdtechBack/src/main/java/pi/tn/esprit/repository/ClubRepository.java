package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Club;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Integer> {
}
