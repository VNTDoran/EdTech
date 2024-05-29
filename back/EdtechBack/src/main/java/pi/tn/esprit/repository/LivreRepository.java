package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Document;
import pi.tn.esprit.models.Livre;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
}