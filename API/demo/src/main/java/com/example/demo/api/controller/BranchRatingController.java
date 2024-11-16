package com.example.demo.api.controller;

import com.example.demo.api.entities.BranchRating;
import com.example.demo.api.service.BranchRatingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@SecurityRequirement(name = "api")
@RequestMapping("/api/branchRating")
public class BranchRatingController {

    @Autowired
    BranchRatingService branchRatingService;


    @PostMapping
    public ResponseEntity create(@Valid @RequestBody BranchRating branchRating) {
        BranchRating newBranchRating = branchRatingService.create(branchRating);
        return ResponseEntity.ok(newBranchRating);
    }

    @GetMapping
    public ResponseEntity get() {
        List<BranchRating> branchRatings = branchRatingService.getAllBranchRating();
        return ResponseEntity.ok(branchRatings);
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody BranchRating branchRating) {
        BranchRating updatedBranchRating = branchRatingService.update(id, branchRating);
        return ResponseEntity.ok(updatedBranchRating);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable long id) {
        BranchRating deletedBranchRating = branchRatingService.delete(id);
        return ResponseEntity.ok(deletedBranchRating);
    }


}
