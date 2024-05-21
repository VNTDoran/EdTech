package pi.tn.esprit.services;

import pi.tn.esprit.models.Document;

import java.util.List;

public interface DocumentService {
    List<Document> retrieveAllDocuments();
    Document retrieveDocument(Long DocumentId);
    Document addDocument(Document Document);
    void removeDocument(Long DocumentId);


}
