package com.example.demo.api.controller;

import com.example.demo.api.entities.WorkingHours;
import com.example.demo.api.service.WorkingHoursService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/workinghours")
@PreAuthorize("hasAnyAuthority('MANAGER', 'SYLIST', 'CASHIER')")
public class WorkingHoursController {

    @Autowired
    WorkingHoursService workingHoursService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody WorkingHours workingHours) {
        WorkingHours newWorkingHours = workingHoursService.create(workingHours);
        return ResponseEntity.ok(newWorkingHours);
    }

    @GetMapping
    public ResponseEntity get() {
        List<WorkingHours> workingHours = workingHoursService.getAllWorkingHours();
        return ResponseEntity.ok(workingHours);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody WorkingHours workingHours) {
        WorkingHours updatedWorkingHours = workingHoursService.update(id, workingHours);
        return ResponseEntity.ok(updatedWorkingHours);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        WorkingHours deletedWorkingHours = workingHoursService.delete(id);
        return ResponseEntity.ok(deletedWorkingHours);
    }

}
