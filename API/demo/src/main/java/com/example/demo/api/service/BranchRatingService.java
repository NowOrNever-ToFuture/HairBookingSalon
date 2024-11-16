package com.example.demo.api.service;

import com.example.demo.api.entities.BranchRating;
import com.example.demo.api.repository.BranchRatingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchRatingService {

    @Autowired
    BranchRatingRepository branchRatingRepository;

    public BranchRating create(BranchRating branchRating) {
        BranchRating newBranchRating = branchRatingRepository.save(branchRating);
        return branchRating;
    }

    public List<BranchRating> getAllBranchRating() {
        List<BranchRating> branchRatings = branchRatingRepository.findAll();
        return branchRatings;
    }

    public BranchRating update(long id, BranchRating branchRating) {
        BranchRating oldBranchRating = getBranchRatingById(id);

        oldBranchRating.setBranch(branchRating.getBranch());
        oldBranchRating.setRating(branchRating.getRating());
        oldBranchRating.setRatingDate(branchRating.getRatingDate());
        oldBranchRating.setReview(branchRating.getReview());
        oldBranchRating.setUser(branchRating.getUser());

        return branchRatingRepository.save(oldBranchRating);
    }

    public BranchRating delete(long id) {
        BranchRating oldBranchRating = getBranchRatingById(id);
        oldBranchRating.setDeleted(true);
        return branchRatingRepository.save(oldBranchRating);
    }

    public BranchRating getBranchRatingById(long id) {
        BranchRating oldBranchRating = branchRatingRepository.findBranchRatingById(id);
        if (oldBranchRating == null) throw new EntityNotFoundException("Branch Rating with id " + id + " not found");
        return oldBranchRating;
    }

}
