package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.User;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findStudentsByClasse_Id(int classeId);
    List<Student> findStudentByConfirmed(int conf);
    Student findStudentByname(String name);
    Student findStudentByUserId(Long id);
}
