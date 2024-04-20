package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.repository.ClasseRepository;
import pi.tn.esprit.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;
    @Autowired
    ClasseRepository classeRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> retrieveAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student retrieveStudent(int studentId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        return optionalStudent.orElse(null);
    }

    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public void removeStudent(int studentId) {
        studentRepository.deleteById(studentId);
    }

    @Override
    public Student modifyStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public void assignClasseToStudent(int studentId, int classeId) {
        Classe classe = classeRepository.getReferenceById(classeId);
        Student student = studentRepository.getReferenceById(studentId);
        student.setClasse(classe);
        studentRepository.save(student);
    }

    @Override
    public void deassignClasseFromStudent(int studentId) {
        Student student = studentRepository.getReferenceById(studentId);
        student.setClasse(null);
        studentRepository.save(student);
    }

    @Override
    public List<Student> retrieveAllStudentsByClass(int classeId) {
        return studentRepository.findStudentsByClasse_Id(2);
    }
}
