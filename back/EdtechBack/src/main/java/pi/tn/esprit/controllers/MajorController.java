package pi.tn.esprit.controllers;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.services.MajorService;

import java.util.List;
@RestController
@RequestMapping("/api/majors")
@Tag(name = "Web Services for Major Management")
public class MajorController {

    @Autowired
    private MajorService majorService;

    @Operation(description = "Retrieves all majors")
    @GetMapping("/retrieve-all")
    public List<Major> retrieveAllMajors() {
        return majorService.retrieveAllMajors();
    }

    @Operation(description = "Retrieves a specific major by ID")
    @GetMapping("/retrieve/{majorId}")
    public Major retrieveMajor(@PathVariable int majorId) {
        return majorService.retrieveMajor(majorId);
    }

    @Operation(description = "Adds a new major")
    @PostMapping("/add")
    public Major addMajor(@RequestBody Major major) {
        return majorService.addMajor(major);
    }

    @Operation(description = "Removes a major by ID")
    @DeleteMapping("/remove/{majorId}")
    public void removeMajor(@PathVariable int majorId) {
        majorService.removeMajor(majorId);
    }

    @Operation(description = "Modifies an existing major")
    @PutMapping("/modify")
    public Major modifyMajor(@RequestBody Major major) {
        return majorService.modifyMajor(major);
    }
}
