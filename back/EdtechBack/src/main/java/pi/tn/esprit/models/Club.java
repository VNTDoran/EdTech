package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="club")
    @JsonIgnore
    private Set<Student> etudiants;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="club")
    private Set<Event> Events;
}