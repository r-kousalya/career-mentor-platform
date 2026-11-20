package com.kousalya.careermentor.health;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/health")
public class HealthController {
 @GetMapping public Map<String,String> health(){return Map.of("status","UP","service","career-mentor-api");}
}