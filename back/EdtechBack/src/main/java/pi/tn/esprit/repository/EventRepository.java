package pi.tn.esprit.repository;

import pi.tn.esprit.models.Event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}