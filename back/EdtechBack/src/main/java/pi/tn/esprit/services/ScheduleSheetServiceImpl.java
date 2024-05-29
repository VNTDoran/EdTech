package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class ScheduleSheetServiceImpl implements ScheduleSheetService{

    @Autowired
    private ScheduleSheetRepository scheduleSheetRepository;

    @Override
    public List<ScheduleSheet> retrieveAllScheduleSheets() {
        return scheduleSheetRepository.findAll();
    }

    @Override
    public ScheduleSheet retrieveScheduleSheet(int scheduleSheetId) {
        return scheduleSheetRepository.findById(scheduleSheetId).orElse(null);
    }

    @Override
    public ScheduleSheet addScheduleSheet(ScheduleSheet scheduleSheet) {
        return scheduleSheetRepository.save(scheduleSheet);
    }

    @Override
    public void removeScheduleSheet(int scheduleSheetId) {
        scheduleSheetRepository.deleteById(scheduleSheetId);
    }

    @Override
    public ScheduleSheet modifyScheduleSheet(ScheduleSheet scheduleSheet) {
        return scheduleSheetRepository.save(scheduleSheet);
    }
}
