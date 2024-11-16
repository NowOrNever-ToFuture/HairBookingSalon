package com.example.demo.api.service;

import com.example.demo.api.dtos.request.BaseSalaryRequest.BaseSalaryRequest;
import com.example.demo.api.dtos.response.BaseSalaryResponse.BaseSalaryResponse;
import com.example.demo.api.entities.BaseSalary;
import com.example.demo.api.repository.BaseSalaryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaseSalaryService {

    @Autowired
    BaseSalaryRepository baseSalaryRepository;

    @Autowired
    ModelMapper modelMapper;

    public BaseSalaryResponse create(BaseSalaryRequest baseSalaryRequest) {
        BaseSalary newBaseSalary = modelMapper.map(baseSalaryRequest, BaseSalary.class);
        BaseSalary savedBaseSalary = baseSalaryRepository.save(newBaseSalary);
        return modelMapper.map(savedBaseSalary, BaseSalaryResponse.class);
    }

    public List<BaseSalary> getAllBaseSalary() {
        List<BaseSalary> baseSalaries = baseSalaryRepository.findAll();
        return baseSalaries;
    }

    public  BaseSalary update(long id, BaseSalary baseSalary) {
        BaseSalary oldBaseSalary = getBaseSalaryById(id);

        oldBaseSalary.setBaseSalaryAmount(baseSalary.getBaseSalaryAmount());
        oldBaseSalary.setRole(baseSalary.getRole());

        return baseSalaryRepository.save(oldBaseSalary);
    }

    public BaseSalary delete(long id) {
        BaseSalary oldBaseSalary = getBaseSalaryById(id);
        oldBaseSalary.setDeleted(true);
        return baseSalaryRepository.save(oldBaseSalary);
    }

    public BaseSalary getBaseSalaryById(long id) {
        BaseSalary oldBaseSalary = baseSalaryRepository.findBaseSalaryById(id);
        if(oldBaseSalary == null) throw new EntityNotFoundException("Base Salary Not Found");
        return oldBaseSalary;
    }


    
}
