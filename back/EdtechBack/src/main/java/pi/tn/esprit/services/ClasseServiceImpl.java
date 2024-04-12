package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.repository.ClasseRepository;
import pi.tn.esprit.repository.MajorRepository;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class ClasseServiceImpl implements ClasseService{

    @Autowired
    private ClasseRepository classeRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private ScheduleSheetRepository scheduleSheetRepository;

    @Override
    public List<Classe> retrieveAllClasses() {
        return classeRepository.findAll();
    }

    @Override
    public Classe retrieveClasse(int classeId) {
        return classeRepository.findById(classeId).orElse(null);
    }

    @Override
    public Classe addClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    @Override
    public void removeClasse(int classeId) {
        classeRepository.deleteById(classeId);
    }

    @Override
    public Classe modifyClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    @Override
    public void assignMajorToClasse(int classeId, int majorId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);
        Major major = majorRepository.findById(majorId).orElse(null);
        if (classe != null && major != null) {
            classe.setMajor(major);
            classeRepository.save(classe);
        }
    }

    @Override
    public void deassignMajorFromClasse(int classeId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);
        if (classe != null) {
            classe.setMajor(null);
            classeRepository.save(classe);
        }
    }

    @Override
    public void assignScheduleSheetToClasse(int classeId, int scheduleSheetId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);
        ScheduleSheet scheduleSheet = scheduleSheetRepository.findById(scheduleSheetId).orElse(null);
        if (classe != null && scheduleSheet != null) {
            classe.setScheduleSheet(scheduleSheet);
            classeRepository.save(classe);
        }
    }

    @Override
    public void deassignScheduleSheetFromClasse(int classeId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);
        if (classe != null) {
            classe.setScheduleSheet(null);
            classeRepository.save(classe);
        }
    }
}
