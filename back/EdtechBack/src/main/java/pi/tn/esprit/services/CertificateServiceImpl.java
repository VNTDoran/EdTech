package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Certificate;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.repository.CertificateRepository;
import pi.tn.esprit.repository.CommentRepository;
import pi.tn.esprit.repository.MajorRepository;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class CertificateServiceImpl implements CertificateService{

    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private CommentRepository commentRepository;
    public Certificate addRating(int certificateId, int rating) {
        Certificate certificate = certificateRepository.findById(certificateId).orElse(null);
        certificate.getRatings().add(rating);
        return certificateRepository.save(certificate);
    }

    public Comment addComment(int certificateId, String username, String text) {
        Certificate certificate = certificateRepository.findById(certificateId).orElse(null);
        Comment comment = new Comment();
        comment.setUsername(username);
        comment.setText(text);
        comment.setCertificate(certificate);
        return commentRepository.save(comment);
    }

    public List<Comment> getComments(int certificateId) {
        return commentRepository.findByCertificateId(certificateId);
    }

    @Override
    public List<Certificate> retrieveAllCertificates() {
        return certificateRepository.findAll();
    }

    @Override
    public Certificate retrieveCertificate(int certificateId) {
        return certificateRepository.findById(certificateId).orElse(null);
    }
    public List<Certificate> getCertificatesByCategory(String category) {
        // Delegate the call to the repository layer
        System.out.println(category);
        return certificateRepository.findCertificatesByCategories(category);
    }
    @Override
    public Certificate addCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @Override
    public void removeCertificate(int certificateId) {
        certificateRepository.deleteById(certificateId);
    }

    @Override
    public Certificate modifyCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @Override
    public void assignMajorToCertificate(int certificateId, int majorId) {
        Certificate certificate = certificateRepository.findById(certificateId).orElse(null);
        Major major = majorRepository.findById(majorId).orElse(null);
        if (certificate != null && major != null) {
            certificate.setMajor(major);
            certificateRepository.save(certificate);
        }
    }

    @Override
    public void deassignMajorFromCertificate(int certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId).orElse(null);
        if (certificate != null) {
            certificate.setMajor(null);
            certificateRepository.save(certificate);
        }
    }

}