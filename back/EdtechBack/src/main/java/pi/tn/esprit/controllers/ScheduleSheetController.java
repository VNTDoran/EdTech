package pi.tn.esprit.controllers;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.services.ClasseService;
import io.swagger.v3.oas.annotations.Operation;
import pi.tn.esprit.services.ScheduleSheetService;

import java.util.List;
@RestController
@RequestMapping("/api/schedule-sheets")
@Tag(name = "Web Services for Schedule Sheet Management")
public class ScheduleSheetController {
    @Autowired
    private ScheduleSheetService scheduleSheetService;

    @Operation(description = "Retrieves all schedule sheets")
    @GetMapping("/retrieve-all")
    public List<ScheduleSheet> retrieveAllScheduleSheets() {
        return scheduleSheetService.retrieveAllScheduleSheets();
    }

    @Operation(description = "Retrieves a specific schedule sheet by ID")
    @GetMapping("/retrieve/{scheduleSheetId}")
    public ScheduleSheet retrieveScheduleSheet(@PathVariable int scheduleSheetId) {
        return scheduleSheetService.retrieveScheduleSheet(scheduleSheetId);
    }

    @Operation(description = "Adds a new schedule sheet")
    @PostMapping("/add")
    public ScheduleSheet addScheduleSheet(@RequestBody ScheduleSheet scheduleSheet) {
        return scheduleSheetService.addScheduleSheet(scheduleSheet);
    }

    @Operation(description = "Removes a schedule sheet by ID")
    @DeleteMapping("/remove/{scheduleSheetId}")
    public void removeScheduleSheet(@PathVariable int scheduleSheetId) {
        scheduleSheetService.removeScheduleSheet(scheduleSheetId);
    }

    @Operation(description = "Modifies an existing schedule sheet")
    @PutMapping("/modify")
    public ScheduleSheet modifyScheduleSheet(@RequestBody ScheduleSheet scheduleSheet) {
        return scheduleSheetService.modifyScheduleSheet(scheduleSheet);
    }
}
