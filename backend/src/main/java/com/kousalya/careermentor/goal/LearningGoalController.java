package com.kousalya.careermentor.goal;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestController @RequestMapping("/api/goals")
public class LearningGoalController {
 private final LearningGoalRepository repository;
 public LearningGoalController(LearningGoalRepository repository){this.repository=repository;}
 @GetMapping public List<LearningGoal> all(){return repository.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public LearningGoal create(@Valid @RequestBody LearningGoal goal){return repository.save(goal);}
 @PutMapping("/{id}") public LearningGoal update(@PathVariable Long id,@Valid @RequestBody LearningGoal body){LearningGoal goal=repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));goal.setTitle(body.getTitle());goal.setCategory(body.getCategory());goal.setProgress(body.getProgress());goal.setTargetDate(body.getTargetDate());return repository.save(goal);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){if(!repository.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);repository.deleteById(id);}
}