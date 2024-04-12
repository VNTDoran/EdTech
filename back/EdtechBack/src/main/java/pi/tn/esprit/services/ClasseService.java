package pi.tn.esprit.services;

import pi.tn.esprit.models.Classe;

import java.util.List;

public interface ClasseService {
    List<Classe> retrieveAllClasses();
    Classe retrieveClasse(int classeId);
    Classe addClasse(Classe classe);
    void removeClasse(int classeId);
    Classe modifyClasse(Classe classe);

    void assignMajorToClasse(int classeId, int majorId);

    void deassignMajorFromClasse(int classeId);

    void assignScheduleSheetToClasse(int classeId, int scheduleSheetId);

    void deassignScheduleSheetFromClasse(int classeId);
}
