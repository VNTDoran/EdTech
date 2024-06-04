package pi.tn.esprit.controllers;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Club;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.ClasseService;
import pi.tn.esprit.services.ClubService;
import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@Tag(name = "Web Services for Club Management")
public class ClubController {
    @Autowired
    private ClubService clubService;
    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private JwtUtils jwtUtils;

    @Operation(description = "Retrieves all clubs")
    @GetMapping("/retrieve-all")
    public ResponseEntity<List<Club>> retrieveAllClubs(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Club> clubs = clubService.retrieveAllClubs();
            return ResponseEntity.ok().body(clubs);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @Operation(description = "Retrieves all clubs with event count")
    @GetMapping("/retrieve-all-with-event-count")
    public ResponseEntity<List<Club>> retrieveAllClubsevent(HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Club> clubs = clubService.retrieveAllClubs();
            clubs.forEach(club -> club.setEventCount(club.getEvents().size()));
            return ResponseEntity.ok().body(clubs);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Retrieves a specific club by ID")
    @GetMapping("/retrieve/{clubId}")
    public ResponseEntity<Club> retrieveClubs(@PathVariable int clubId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Club club = clubService.retrieveClub(clubId);
            if (club != null) {
                return ResponseEntity.ok().body(club);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @Operation(description = "Adds a new club")
    @PostMapping("/add")
    public ResponseEntity<Club> addClub(@RequestBody Club club, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Club addedClub = clubService.addClub(club);
            return ResponseEntity.ok().body(addedClub);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Removes a club by ID")
    @DeleteMapping("/remove/{clubId}")
    public ResponseEntity<Void> removeClub(@PathVariable int clubId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            clubService.removeClub(clubId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Modifies an existing club")
    @PutMapping("/modify")
    public ResponseEntity<Club> modifyClub(@RequestBody Club club, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            Club modifiedClub = clubService.modifyClub(club);
            return ResponseEntity.ok().body(modifiedClub);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @Operation(description = "Assigns etudiant to a club")
    @PutMapping("/assign-etudiant/{clubId}/{etudiantId}")
    public ResponseEntity<Void> assignEtudiantToClub(@PathVariable int clubId, @PathVariable int etudiantId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            clubService.assignEtudiantToClub(clubId, etudiantId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns etudiant from a club")
    @PutMapping("/deassign-etudiant/{clubId}")
    public ResponseEntity<Void> deassignEtudiantFromClub(@PathVariable int clubId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            clubService.deassignEtudiantFromClub(clubId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Assigns event to a club")
    @PutMapping("/assign-event/{clubId}/{eventId}")
    public ResponseEntity<Void> assignEventToClub(@PathVariable int clubId, @PathVariable int eventId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            clubService.assignEventToClub(clubId, eventId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(description = "Deassigns event from a club")
    @PutMapping("/deassign-event/{clubId}")
    public ResponseEntity<Void> deassignEventtFromClub(@PathVariable int clubId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            clubService.deassignEventFromClub(clubId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }





}
