package pi.tn.esprit.services;

import pi.tn.esprit.models.ScheduleSheet;

import java.util.List;

public interface ScheduleSheetService {
    List<ScheduleSheet> retrieveAllScheduleSheets();
    ScheduleSheet retrieveScheduleSheet(int scheduleSheetId);
    ScheduleSheet addScheduleSheet(ScheduleSheet scheduleSheet);
    void removeScheduleSheet(int scheduleSheetId);
    ScheduleSheet modifyScheduleSheet(ScheduleSheet scheduleSheet);
}
