package pi.tn.esprit.services;

import pi.tn.esprit.models.Certificate;
import pi.tn.esprit.models.Classe;
import pi.tn.esprit.models.Comment;

import java.util.List;

public interface CertificateService {
    List<Certificate> retrieveAllCertificates();
    Certificate retrieveCertificate(int certificateId);
    Certificate addCertificate(Certificate certificate);
    void removeCertificate(int certificateId);
    Certificate modifyCertificate(Certificate certificate);

    void assignMajorToCertificate(int certificateId, int majorId);

    void deassignMajorFromCertificate(int certificateId);
     List<Certificate> getCertificatesByCategory(String category);
     Certificate addRating(int certificateId, int rating);
     Comment addComment(int certificateId, String username, String text);
    public List<Comment> getComments(int certificateId);
}