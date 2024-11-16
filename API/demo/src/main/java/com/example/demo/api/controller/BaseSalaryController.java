package com.example.demo.api.controller;

import com.example.demo.api.dtos.request.BaseSalaryRequest.BaseSalaryRequest;
import com.example.demo.api.dtos.response.BaseSalaryResponse.BaseSalaryResponse;
import com.example.demo.api.entities.BaseSalary;
import com.example.demo.api.service.BaseSalaryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/baseSalary")
public class BaseSalaryController {

    @Autowired
    BaseSalaryService baseSalaryService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody BaseSalaryRequest baseSalary) {
        BaseSalaryResponse baseSalaryResponse = baseSalaryService.create(baseSalary);
        return ResponseEntity.ok(baseSalaryResponse);
    }

    @GetMapping
    public ResponseEntity get() {
        List<BaseSalary> baseSalaries = baseSalaryService.getAllBaseSalary();
        return ResponseEntity.ok(baseSalaries);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody BaseSalary baseSalary) {
        BaseSalary updatedBaseSalary = baseSalaryService.update(id, baseSalary);
        return ResponseEntity.ok(updatedBaseSalary);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        BaseSalary deletedBaseSalary = baseSalaryService.delete(id);
        return ResponseEntity.ok(deletedBaseSalary);
    }
}
