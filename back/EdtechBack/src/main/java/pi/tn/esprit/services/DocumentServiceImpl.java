package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Document;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.repository.DocumentRepository;
import pi.tn.esprit.repository.MajorRepository;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository DocumentRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private ScheduleSheetRepository scheduleSheetRepository;

    @Override
    public List<Document> retrieveAllDocuments() {
        return DocumentRepository.findAll();
    }

    @Override
    public Document retrieveDocument(Long DocumentId) {
        return DocumentRepository.findById((DocumentId)).orElse(null);
    }

    @Override
    public Document addDocument(Document Document) {
        return DocumentRepository.save(Document);
    }

    @Override
    public void removeDocument(Long DocumentId) {
        DocumentRepository.deleteById(DocumentId);
    }

    @Override
    public Document incrementScore(Long id) {
        Document document = DocumentRepository.findById(id).orElse(null);
        if (document != null) {
            document.setScore(document.getScore() + 1);
            return DocumentRepository.save(document);
        }
        return null;
    }

}
