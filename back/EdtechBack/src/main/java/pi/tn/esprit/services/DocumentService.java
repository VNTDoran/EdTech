package pi.tn.esprit.services;

import pi.tn.esprit.models.Document;
import pi.tn.esprit.models.Livre;

import java.util.List;

public interface DocumentService {
    List<Document> retrieveAllDocuments();
    Document retrieveDocument(Long DocumentId);
    Document addDocument(Document Document);
    void removeDocument(Long DocumentId);
    Document incrementScore(Long id);


}