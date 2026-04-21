package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping
    public String getStudent() {
        return "Response from Student Service - Instance 1";
    }
}