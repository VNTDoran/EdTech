package pi.tn.esprit.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @ManyToOne
    private Classe classe;


    public Student(String username, String s, int i) {
        this.name = username;
        this.cin = s;
        System.out.println(confirmed);
        this.confirmed = i;
    }
}
