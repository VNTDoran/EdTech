package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Certificate;
import pi.tn.esprit.models.Classe;

public interface CertificateRepository extends JpaRepository<Certificate, Integer> {
}
