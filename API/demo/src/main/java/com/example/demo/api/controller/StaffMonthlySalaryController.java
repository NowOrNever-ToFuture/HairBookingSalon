package com.example.demo.api.controller;

import com.example.demo.api.entities.StaffMonthlySalary;
import com.example.demo.api.service.StaffMonthlySalaryService;
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
@RequestMapping("/api/staffMonthlySalary")
@PreAuthorize("hasAnyAuthority('MANAGER')")
public class StaffMonthlySalaryController {

    @Autowired
    StaffMonthlySalaryService staffMonthlySalaryService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody StaffMonthlySalary staffMonthlySalary) {
        StaffMonthlySalary newSalary = staffMonthlySalaryService.create(staffMonthlySalary);
        return ResponseEntity.ok(staffMonthlySalary);
    }

    @GetMapping
    public ResponseEntity get() {
        List<StaffMonthlySalary> staffMonthlySalaries = staffMonthlySalaryService.getAllStaffMonthlySalary();
        return ResponseEntity.ok(staffMonthlySalaries);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @RequestBody StaffMonthlySalary staffMonthlySalary) {
        StaffMonthlySalary updateSalary = staffMonthlySalaryService.update(id, staffMonthlySalary);
        return ResponseEntity.ok(updateSalary);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        StaffMonthlySalary deleteSalary = staffMonthlySalaryService.delete(id);
        return ResponseEntity.ok(deleteSalary);
    }

}
