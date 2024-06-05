package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "score")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonIgnore
    private Quiz quiz;

    private int value;

}
