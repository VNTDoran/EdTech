package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
