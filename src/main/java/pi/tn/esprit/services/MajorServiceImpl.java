package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.repository.MajorRepository;

import java.util.List;

@Service

public class MajorServiceImpl implements MajorService{

    @Autowired
    private MajorRepository majorRepository;

    @Override
    public List<Major> retrieveAllMajors() {
        return majorRepository.findAll();
    }

    @Override
    public Major retrieveMajor(int majorId) {
        return majorRepository.findById(majorId).orElse(null);
    }

    @Override
    public Major addMajor(Major major) {
        return majorRepository.save(major);
    }

    @Override
    public void removeMajor(int majorId) {
        majorRepository.deleteById(majorId);
    }

    @Override
    public Major modifyMajor(Major major) {
        return majorRepository.save(major);
    }
}
