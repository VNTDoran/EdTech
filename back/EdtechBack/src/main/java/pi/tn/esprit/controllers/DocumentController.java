package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Document;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.DocumentService;

import java.util.List;

@RestController
@RequestMapping("/api/Documents")
@Tag(name = "Web Services for Class Management")
public class DocumentController {
    @Autowired
    private DocumentService DocumentService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all Documents")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Document>> retrieveAllDocuments(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Document> Documents = DocumentService.retrieveAllDocuments();
            return ResponseEntity.ok().body(Documents);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific class by ID")
    @GetMapping("/retrieve/{DocumentId}")
    public ResponseEntity<Document> retrieveDocument(@PathVariable Long DocumentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Document Document = DocumentService.retrieveDocument(DocumentId);
            if (Document != null) {
                return ResponseEntity.ok().body(Document);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Adds a new Document")
    @PostMapping("/add")
    public ResponseEntity<Document> addDocument(@RequestBody Document Document, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Document addedDocument = DocumentService.addDocument(Document);
            return ResponseEntity.ok().body(addedDocument);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a class by ID")
    @DeleteMapping("/remove/{DocumentId}")
    public ResponseEntity<Void> removeDocument(@PathVariable Long DocumentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            DocumentService.removeDocument(DocumentId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/increment-score/{id}")
    public Document incrementScore(@PathVariable Long id) {
        return DocumentService.incrementScore(id);
    }
}

