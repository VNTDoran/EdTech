package pi.tn.esprit.services;

import pi.tn.esprit.models.Major;

import java.util.List;


public interface MajorService {
    List<Major> retrieveAllMajors();
    Major retrieveMajor(int majorId);
    Major addMajor(Major major);
    void removeMajor(int majorId);
    Major modifyMajor(Major major);
}
