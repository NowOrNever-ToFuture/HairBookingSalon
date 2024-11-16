package com.example.demo.api.service;

import com.example.demo.api.dtos.request.BranchRequest.BranchRequest;
import com.example.demo.api.entities.Branch;
import com.example.demo.api.exception.DuplicateEntity;
import com.example.demo.api.repository.BranchRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchService {
    @Autowired
    BranchRepository branchRepository;

    @Autowired
    ModelMapper modelMapper;

    //Create

    public Branch createBranch(BranchRequest branchRequest) {
        try {
            Branch branch = modelMapper.map(branchRequest, Branch.class);
            Branch newBranch = branchRepository.save(branch);
            return newBranch;
        } catch (Exception e) {
            throw new DuplicateEntity("Duplicate branch");
        }
    }

    //Read
    public List<Branch> getAllBranche() {
        List<Branch> branches = branchRepository.findAll();
        return branches;
    }

    //Update
    public Branch update(long id, Branch branch) {
        Branch oldBranch = getBranchById(id);

        oldBranch.setBranchName(branch.getBranchName());
        oldBranch.setBranchAddress(branch.getBranchAddress());
        oldBranch.setBranchPhoneNumber(branch.getBranchPhoneNumber());
        oldBranch.setImageSrc(branch.getImageSrc());

        return branchRepository.save(oldBranch);
    }



    //Delete
    public Branch delete(long id) {
        Branch oldBranch = getBranchById(id);
        oldBranch.setDeleted(true);
        return branchRepository.save(oldBranch);
    }

    public Branch getBranchById(long id) {
        Branch oldBranch = branchRepository.findBranchById(id);
        if (oldBranch == null) throw new EntityNotFoundException("Branch not found");
        return oldBranch;
    }



}
