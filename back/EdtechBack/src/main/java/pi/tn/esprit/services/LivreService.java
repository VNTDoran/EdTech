package pi.tn.esprit.services;

import pi.tn.esprit.models.Livre;

import java.util.List;

public interface LivreService {
    List<Livre> retrieveAllLivres();
    Livre retrieveLivre(Long LivreId);
    Livre addLivre(Livre Livre);
    void removeLivre(Long LivreId);

  
}
