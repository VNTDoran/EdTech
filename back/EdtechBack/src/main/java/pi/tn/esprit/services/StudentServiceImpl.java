package pi.tn.esprit.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.*;
import pi.tn.esprit.repository.ClasseRepository;
import pi.tn.esprit.repository.StudentRepository;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        return studentRepository.findStudentsByClasse_Id(classeId);
    }

    @Override
    public String retrieveNewMeeting(String time){
        String topic = "Custom Topic";
        String jsonBody = "{\r\n" +
                "  \"topic\": \"" + topic + "\",\r\n" +
                "  \"type\":2,\r\n" +
                "  \"start_time\": \"" + time + "\",\r\n" +
                "  \"duration\":\"3\",\r\n" +
                "  \"settings\":{\r\n" +
                "   \"host_video\":true,\r\n" +
                "   \"participant_video\":true,\r\n" +
                "   \"join_before_host\":true,\r\n" +
                "   \"mute_upon_entry\":\"true\",\r\n" +
                "   \"watermark\": \"true\",\r\n" +
                "   \"audio\": \"voip\",\r\n" +
                "   \"auto_recording\": \"cloud\"\r\n" +
                "     } \r\n" +
                "  \r\n" +
                " }";
        String bearerToken = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImNhNmQ5NDdiLWY3YTktNGQ5NC05N2FmLWRmOWIzNjNhMGRjOCJ9.eyJ2ZXIiOjksImF1aWQiOiIxYjNlZmQyYWU0ODg0NTNkN2I4ZWEwZTVkMTc0NGI2NCIsImNvZGUiOiJ6TjluZ3ZERjhpcDVqSHhhOExKVGdLVzdlZjlEZzZSanciLCJpc3MiOiJ6bTpjaWQ6MHhkd3JkV2tRd2E2OEtSMmI3WWlJdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJ3elY5b3RvRlJzeXNrVE1NdVIyaG9nIiwibmJmIjoxNzE2OTgxNjA3LCJleHAiOjE3MTY5ODUyMDcsImlhdCI6MTcxNjk4MTYwNywiYWlkIjoiaHJ2R3JsX1VRcS1Fa0d4YVFqWVBiZyJ9.DegYwo2s6b2I3NbOXdZTUvOc2ViwdbsMRNgCHmc68-1kdfRDto9C5M1LCkZ7Yx8vOiyu-Fp4H_fyIUTrWd17Qg";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.zoom.us/v2/users/me/meetings"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + bearerToken)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
        HttpResponse<String> response = null;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        String responseBody = response.body();
        JSONObject jsonResponse = new JSONObject(responseBody);
        String startUrl = String.valueOf(jsonResponse.getLong("id"));
        return startUrl;
    }

    @Override
    public List<Student> retrieveAllNewStudents() {
        return studentRepository.findStudentByConfirmed(0);
    }

    @Override
    public void decrementerpoints(int studentId,int scoreCertif){
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isPresent()){
            Student student = optionalStudent.get();
            student.setPoints(student.getPoints()-scoreCertif);
            studentRepository.save(student);
        }
    }

}
