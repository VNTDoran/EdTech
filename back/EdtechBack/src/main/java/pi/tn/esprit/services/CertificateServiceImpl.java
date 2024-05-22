package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Certificate;
import pi.tn.esprit.models.Major;
import pi.tn.esprit.models.ScheduleSheet;
import pi.tn.esprit.repository.CertificateRepository;
import pi.tn.esprit.repository.MajorRepository;
import pi.tn.esprit.repository.ScheduleSheetRepository;

import java.util.List;


@Service

public class CertificateServiceImpl implements CertificateService{

    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private MajorRepository majorRepository;

    @Override
    public List<Certificate> retrieveAllCertificates() {
        return certificateRepository.findAll();
    }

    @Override
    public Certificate retrieveCertificate(int certificateId) {
        return certificateRepository.findById(certificateId).orElse(null);
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