package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.Utils.Mailer;
import pi.tn.esprit.models.ERole;
import pi.tn.esprit.models.Role;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.User;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.StudentService;
import pi.tn.esprit.services.UserService;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;


@RestController
@RequestMapping("/api/students")
@Tag(name = "Web Services for Student Management")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

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

    @Operation(description = "Retrieves all new students")
    @GetMapping("/retrieve-allnew")
    public ResponseEntity<List<Student>> retrieveAllNewStudents(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Student> students = studentService.retrieveAllNewStudents();
            return ResponseEntity.ok().body(students);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "decrementer points ")
    @PutMapping("/decrementer-points/{studentId}")
    public ResponseEntity<Void> decrementerPoints(@PathVariable int studentId,@RequestBody int scoreCertif, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            studentService.decrementerpoints(studentId, scoreCertif);
            return ResponseEntity.noContent().build();
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
            System.out.println(students);
            System.out.println(classeId);
            return ResponseEntity.ok().body(students);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific student by ID")
    @GetMapping("/retrieve/{studentId}")
    public ResponseEntity<Student> retrieveStudent(@PathVariable int studentId, HttpServletRequest request) {
        System.out.println("test");
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Student student = studentService.retrieveStudent(studentId);
            return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a new meeting")
    @GetMapping("/retrievemeet/{time}")
    public ResponseEntity<String> retrieveNewMeet(@PathVariable String time, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            String meeting = studentService.retrieveNewMeeting(time);
            if (meeting != null){
                String url = "https://us05web.zoom.us/s/";

                Mailer.sendMail(time,url+meeting,"houssemkacem@yahoo.fr");
            }
            return meeting != null ? ResponseEntity.ok(meeting) : ResponseEntity.notFound().build();
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

    @Operation(description = "Assign role to new student")
    @PutMapping("/confirm-newstudent/{userId}")
    public ResponseEntity<Void> confirmNewStudent(@PathVariable int userId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        System.out.println("ts");
        if (token != null && jwtUtils.validateToken(token)) {
            userService.confirmNewUser(userId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Join us")
    @PutMapping("/confirm-join/{userId}")
    public ResponseEntity<Void> confirmJoin(@PathVariable int userId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            userService.joinUs(userId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
