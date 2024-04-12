package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Role;
import pi.tn.esprit.models.ScheduleSheet;

public interface ScheduleSheetRepository extends JpaRepository<ScheduleSheet, Integer> {
}
