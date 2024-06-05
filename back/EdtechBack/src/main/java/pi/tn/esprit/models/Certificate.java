package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private String logoLink;
    private int score;
    @ManyToOne
    private Major major;
    @ElementCollection
    private List<String> categories; // Add categories field
    @JsonIgnore
    @ManyToMany(mappedBy = "certificateList", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Student> students = new ArrayList<>();
    @ElementCollection
    private List<Integer> ratings = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
