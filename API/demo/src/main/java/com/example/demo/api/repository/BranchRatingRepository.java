package com.example.demo.api.repository;

import com.example.demo.api.entities.BranchRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRatingRepository extends JpaRepository<BranchRating, Long> {
    BranchRating findBranchRatingById(long id);
}
