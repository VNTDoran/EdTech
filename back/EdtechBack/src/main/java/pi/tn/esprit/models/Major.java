package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

    @Entity
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Major {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String name;
        private String description;
        @ManyToOne
        private Certificate certificate;
        @OneToMany(cascade = CascadeType.ALL, mappedBy = "major")
        @JsonIgnore
        private Set<Classe> courses;
    }
