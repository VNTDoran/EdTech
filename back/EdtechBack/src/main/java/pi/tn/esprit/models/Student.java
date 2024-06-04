package pi.tn.esprit.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String cin;
    private int confirmed;
    private int points;
    @JsonIgnore
    @OneToOne
    private User user;
    @ManyToOne
    Club club;
    @JsonIgnore
    @ManyToOne
    private Classe classe;
    @Column(columnDefinition = "boolean default false")
    private Boolean paid;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Certificate> certificateList;
    public Student(String username, String s, int i) {
        this.name = username;
        this.cin = s;
        System.out.println(confirmed);
        this.confirmed = i;
    }
}
