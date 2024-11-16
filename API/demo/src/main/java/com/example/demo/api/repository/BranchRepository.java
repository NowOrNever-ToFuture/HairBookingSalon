package com.example.demo.api.repository;

import com.example.demo.api.entities.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    Branch findBranchById(long id);
    Branch findBranchByBranchName(String branchName);
}
