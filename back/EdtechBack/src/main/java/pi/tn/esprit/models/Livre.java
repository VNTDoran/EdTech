package pi.tn.esprit.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Livre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String auteur;
    private String isbn;
    private Date datePublication;
    private int exemplairesDisponibles;

    @ManyToMany(mappedBy = "livres")
    private List<User> user;
}
