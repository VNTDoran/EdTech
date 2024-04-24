package pi.tn.esprit.services;

import pi.tn.esprit.models.Student;

import java.util.List;

public interface StudentService {

    List<Student> retrieveAllStudents();
    Student retrieveStudent(int studentId);
    Student addStudent(Student student);
    void removeStudent(int studentId);
    Student modifyStudent(Student student);
    void assignClasseToStudent(int studentId, int classeId);

    void deassignClasseFromStudent(int studentId);

    List<Student> retrieveAllStudentsByClass(int classeId);

    String retrieveNewMeeting(String time);

    List<Student> retrieveAllNewStudents();
}
