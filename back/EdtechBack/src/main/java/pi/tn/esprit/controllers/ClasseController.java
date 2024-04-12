package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.ClasseService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@Tag(name = "Web Services for Class Management")
public class ClasseController {
    @Autowired
    private ClasseService classeService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all classes")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Classe>> retrieveAllClasses(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Classe> classes = classeService.retrieveAllClasses();
            return ResponseEntity.ok().body(classes);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific class by ID")
    @GetMapping("/retrieve/{classeId}")
    public ResponseEntity<Classe> retrieveClasse(@PathVariable int classeId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Classe classe = classeService.retrieveClasse(classeId);
            if (classe != null) {
                return ResponseEntity.ok().body(classe);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Adds a new class")
    @PostMapping("/add")
    public ResponseEntity<Classe> addClasse(@RequestBody Classe classe, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Classe addedClasse = classeService.addClasse(classe);
            return ResponseEntity.ok().body(addedClasse);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a class by ID")
    @DeleteMapping("/remove/{classeId}")
    public ResponseEntity<Void> removeClasse(@PathVariable int classeId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            classeService.removeClasse(classeId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Modifies an existing class")
    @PutMapping("/modify")
    public ResponseEntity<Classe> modifyClasse(@RequestBody Classe classe, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Classe modifiedClasse = classeService.modifyClasse(classe);
            return ResponseEntity.ok().body(modifiedClasse);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Assigns a major to a class")
    @PutMapping("/assign-major/{classeId}/{majorId}")
    public ResponseEntity<Void> assignMajorToClasse(@PathVariable int classeId, @PathVariable int majorId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            classeService.assignMajorToClasse(classeId, majorId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns a major from a class")
    @PutMapping("/deassign-major/{classeId}")
    public ResponseEntity<Void> deassignMajorFromClasse(@PathVariable int classeId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            classeService.deassignMajorFromClasse(classeId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Assigns a schedule sheet to a class")
    @PutMapping("/assign-schedule-sheet/{classeId}/{scheduleSheetId}")
    public ResponseEntity<Void> assignScheduleSheetToClasse(@PathVariable int classeId, @PathVariable int scheduleSheetId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            classeService.assignScheduleSheetToClasse(classeId, scheduleSheetId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns a schedule sheet from a class")
    @PutMapping("/deassign-schedule-sheet/{classeId}")
    public ResponseEntity<Void> deassignScheduleSheetFromClasse(@PathVariable int classeId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            classeService.deassignScheduleSheetFromClasse(classeId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}

