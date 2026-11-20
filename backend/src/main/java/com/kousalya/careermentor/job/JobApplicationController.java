package com.kousalya.careermentor.job;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestController @RequestMapping("/api/jobs")
public class JobApplicationController {
 private final JobApplicationRepository repository;
 public JobApplicationController(JobApplicationRepository repository){this.repository=repository;}
 @GetMapping public List<JobApplication> all(){return repository.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public JobApplication create(@Valid @RequestBody JobApplication body){body.setId(null);return repository.save(body);}
 @PutMapping("/{id}") public JobApplication update(@PathVariable Long id,@Valid @RequestBody JobApplication body){JobApplication job=repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));job.setRole(body.getRole());job.setCompany(body.getCompany());job.setAppliedDate(body.getAppliedDate());job.setStatus(body.getStatus());return repository.save(job);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){if(!repository.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);repository.deleteById(id);}
}