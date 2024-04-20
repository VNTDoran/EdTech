package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import pi.tn.esprit.models.Major;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @ManyToOne
    private Major major;
    @OneToOne(cascade = CascadeType.ALL)
    private ScheduleSheet scheduleSheet;

    @ManyToOne
    private Student student;
}
