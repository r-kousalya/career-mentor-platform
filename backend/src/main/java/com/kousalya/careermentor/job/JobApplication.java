package com.kousalya.careermentor.job;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
@Entity @Table(name="job_applications")
public class JobApplication {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank private String role;
 @NotBlank private String company;
 private LocalDate appliedDate=LocalDate.now();
 @Enumerated(EnumType.STRING) private JobStatus status=JobStatus.APPLIED;
 protected JobApplication(){}
 public JobApplication(String role,String company,LocalDate appliedDate,JobStatus status){this.role=role;this.company=company;this.appliedDate=appliedDate==null?LocalDate.now():appliedDate;this.status=status==null?JobStatus.APPLIED:status;}
 public Long getId(){return id;} public String getRole(){return role;} public void setRole(String v){role=v;} public String getCompany(){return company;} public void setCompany(String v){company=v;} public LocalDate getAppliedDate(){return appliedDate;} public void setAppliedDate(LocalDate v){appliedDate=v;} public JobStatus getStatus(){return status;} public void setStatus(JobStatus v){status=v;}
}