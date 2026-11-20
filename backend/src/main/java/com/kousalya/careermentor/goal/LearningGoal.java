package com.kousalya.careermentor.goal;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
@Entity @Table(name="learning_goals")
public class LearningGoal {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank private String title;
 @NotBlank private String category;
 @Min(0) @Max(100) private int progress;
 private LocalDate targetDate;
 protected LearningGoal(){}
 public Long getId(){return id;} public String getTitle(){return title;} public void setTitle(String v){title=v;} public String getCategory(){return category;} public void setCategory(String v){category=v;} public int getProgress(){return progress;} public void setProgress(int v){progress=v;} public LocalDate getTargetDate(){return targetDate;} public void setTargetDate(LocalDate v){targetDate=v;}
}