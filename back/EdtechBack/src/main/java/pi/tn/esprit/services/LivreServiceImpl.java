package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Livre;
import pi.tn.esprit.repository.LivreRepository;
import pi.tn.esprit.repository.MajorRepository;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class LivreServiceImpl implements LivreService {

    @Autowired
    private LivreRepository LivreRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private ScheduleSheetRepository scheduleSheetRepository;

    @Override
    public List<Livre> retrieveAllLivres() {
        return LivreRepository.findAll();
    }

    @Override
    public Livre retrieveLivre(Long LivreId) {
        return LivreRepository.findById(LivreId).orElse(null);
    }

    @Override
    public Livre addLivre(Livre Livre) {
        return LivreRepository.save(Livre);
    }

    @Override
    public void removeLivre(Long LivreId) {
        LivreRepository.deleteById(LivreId);
    }
}
