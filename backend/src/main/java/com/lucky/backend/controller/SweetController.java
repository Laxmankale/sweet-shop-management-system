package com.lucky.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    @GetMapping
    public List<String> getAllSweets() {
        return List.of(); // minimal implementation
    }
}
