package pi.tn.esprit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "quizs",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "title")
        })
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String title;

    private Integer duration;

    @NotBlank
    @Size(max = 50)
    private String category;

    @ManyToMany
    @JsonIgnore
    private List<Question> questions;
}
