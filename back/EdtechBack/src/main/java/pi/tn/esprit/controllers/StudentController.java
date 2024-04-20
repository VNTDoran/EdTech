package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Web Services for Student Management")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all students")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Student>> retrieveAllStudents(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Student> students = studentService.retrieveAllStudents();
            return ResponseEntity.ok().body(students);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves all students by class")
    @GetMapping("/retrieve-all-by-class/{classeId}")
    public ResponseEntity<List<Student>> retrieveAllStudentsByClass(@PathVariable int classeId,HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Student> students = studentService.retrieveAllStudentsByClass(classeId);
            return ResponseEntity.ok().body(students);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific student by ID")
    @GetMapping("/retrieve/{studentId}")
    public ResponseEntity<Student> retrieveStudent(@PathVariable int studentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Student student = studentService.retrieveStudent(studentId);
            return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Adds a new student")
    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Student addedStudent = studentService.addStudent(student);
            return ResponseEntity.ok().body(addedStudent);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a student by ID")
    @DeleteMapping("/remove/{studentId}")
    public ResponseEntity<Void> removeStudent(@PathVariable int studentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            studentService.removeStudent(studentId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Modifies an existing student")
    @PutMapping("/modify")
    public ResponseEntity<Student> modifyStudent(@RequestBody Student student, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Student modifiedStudent = studentService.modifyStudent(student);
            return ResponseEntity.ok().body(modifiedStudent);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Assigns a class to a student")
    @PutMapping("/assign-classe/{studentId}/{classeId}")
    public ResponseEntity<Void> assignClasseToStudent(@PathVariable int studentId, @PathVariable int classeId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            studentService.assignClasseToStudent(studentId, classeId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns a class from a student")
    @PutMapping("/deassign-classe/{studentId}")
    public ResponseEntity<Void> deassignClasseFromStudent(@PathVariable int studentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            studentService.deassignClasseFromStudent(studentId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
