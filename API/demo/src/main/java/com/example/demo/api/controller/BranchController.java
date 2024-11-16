package com.example.demo.api.controller;

import com.example.demo.api.dtos.request.BranchRequest.BranchRequest;
import com.example.demo.api.entities.Branch;
import com.example.demo.api.entities.User;
import com.example.demo.api.service.BranchService;
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
@RequestMapping("/api/branch")
public class BranchController {
    @Autowired
    BranchService branchService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody BranchRequest branch) {
        Branch newBranch = branchService.createBranch(branch);
        return ResponseEntity.ok(newBranch);
    }

    @GetMapping
    public ResponseEntity get(){
        List<Branch> branches = branchService.getAllBranche();
        return ResponseEntity.ok(branches);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody Branch branch) {
        Branch updatedBranch = branchService.update(id, branch);
        return ResponseEntity.ok(updatedBranch);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        Branch deletedBranch = branchService.delete(id);
        return ResponseEntity.ok(deletedBranch);
    }
}
