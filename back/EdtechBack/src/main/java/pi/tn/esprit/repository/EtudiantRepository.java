package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant , Integer> {
}
