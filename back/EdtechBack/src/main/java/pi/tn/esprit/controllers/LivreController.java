package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Livre;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.LivreService;

import java.util.List;

@RestController
@RequestMapping("/api/Livres")
@Tag(name = "Web Services for Class Management")
public class LivreController {
    @Autowired
    private LivreService LivreService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all Livres")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Livre>> retrieveAllLivres(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Livre> Livres = LivreService.retrieveAllLivres();
            return ResponseEntity.ok().body(Livres);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific livre by ID")
    @GetMapping("/retrieve/{LivreId}")
    public ResponseEntity<Livre> retrieveLivre(@PathVariable Long LivreId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Livre Livre = LivreService.retrieveLivre(LivreId);
            if (Livre != null) {
                return ResponseEntity.ok().body(Livre);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Adds a new livre")
    @PostMapping("/add")
    public ResponseEntity<Livre> addLivre(@RequestBody Livre Livre, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Livre addedLivre = LivreService.addLivre(Livre);
            return ResponseEntity.ok().body(addedLivre);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a livre by ID")
    @DeleteMapping("/remove/{LivreId}")
    public ResponseEntity<Void> removeLivre(@PathVariable Long LivreId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            LivreService.removeLivre(LivreId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/increment-score/{id}")
    public Livre incrementScore(@PathVariable Long id) {
        return LivreService.incrementScore(id);
    }

}

