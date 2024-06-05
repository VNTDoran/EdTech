package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.models.Role;

public interface MajorRepository extends JpaRepository<Major, Integer> {
}
