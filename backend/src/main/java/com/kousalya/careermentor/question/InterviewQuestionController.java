package com.kousalya.careermentor.question;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController @RequestMapping("/api/questions")
public class InterviewQuestionController {
 @GetMapping public List<Map<String,String>> all(){return List.of(
  Map.of("type","BEHAVIOURAL","text","Tell me about a complex UI problem you solved.","hint","Use a real feature and explain your contribution."),
  Map.of("type","FRONTEND ENGINEERING","text","How do you approach reusable components?","hint","Discuss API design, states, accessibility and maintainability."),
  Map.of("type","SYSTEM THINKING","text","How would you improve a large web application's performance?","hint","Measure first, identify bottlenecks and validate the improvement.")
 );}
}