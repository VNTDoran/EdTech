package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Certificate;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.CertificateService;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@Tag(name = "Web Services for Certificate Management")
public class CertificateController {
    @Autowired
    private CertificateService certificateService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/{certificateId}/ratings")
    public ResponseEntity<Certificate> addRating(@PathVariable int certificateId, @RequestBody int rating) {
        Certificate certificate = certificateService.addRating(certificateId, rating);
        return ResponseEntity.ok(certificate);
    }

    @PostMapping("/{certificateId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable int certificateId, @RequestBody Comment comment) {
        Comment newComment = certificateService.addComment(certificateId, comment.getUsername(), comment.getText());
        return ResponseEntity.ok(newComment);
    }

    @GetMapping("/{certificateId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable int certificateId) {
        List<Comment> comments = certificateService.getComments(certificateId);
        return ResponseEntity.ok(comments);
    }

    @Operation(description = "Retrieves all certificates")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Certificate>> retrieveAllCertificates(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Certificate> certificates = certificateService.retrieveAllCertificates();
            return ResponseEntity.ok().body(certificates);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific certificate by ID")
    @GetMapping("/retrieve/{certificateId}")
    public ResponseEntity<Certificate> retrieveCertificate(@PathVariable int certificateId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Certificate certificate = certificateService.retrieveCertificate(certificateId);
            if (certificate != null) {
                return ResponseEntity.ok().body(certificate);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/retrieve-by-category/{category}")
    public ResponseEntity<List<Certificate>> retrieveCertificatesByCategory(@PathVariable String category) {
        List<Certificate> certificates = certificateService.getCertificatesByCategory(category);
        if (certificates.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(certificates, HttpStatus.OK);
        }
    }

    @Operation(description = "Adds a new certificate")
    @PostMapping("/add")
    public ResponseEntity<Certificate> addCertificate(@RequestBody Certificate certificate, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Certificate addedCertificate = certificateService.addCertificate(certificate);
            return ResponseEntity.ok().body(addedCertificate);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a certificate by ID")
    @DeleteMapping("/remove/{certificateId}")
    public ResponseEntity<Void> removeCertificate(@PathVariable int certificateId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            certificateService.removeCertificate(certificateId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Modifies an existing certificate")
    @PutMapping("/modify")
    public ResponseEntity<Certificate> modifyCertificate(@RequestBody Certificate certificate, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Certificate modifiedCertificate = certificateService.modifyCertificate(certificate);
            return ResponseEntity.ok().body(modifiedCertificate);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Assigns a major to a certificate")
    @PutMapping("/assign-major/{certificateId}/{majorId}")
    public ResponseEntity<Void> assignMajorToCertificate(@PathVariable int certificateId, @PathVariable int majorId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            certificateService.assignMajorToCertificate(certificateId, majorId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns a major from a certificate")
    @PutMapping("/deassign-major/{certificateId}")
    public ResponseEntity<Void> deassignMajorFromCertificate(@PathVariable int certificateId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            certificateService.deassignMajorFromCertificate(certificateId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}
