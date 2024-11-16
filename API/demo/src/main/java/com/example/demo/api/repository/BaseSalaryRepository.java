package com.example.demo.api.repository;

import com.example.demo.api.entities.BaseSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseSalaryRepository extends JpaRepository<BaseSalary, Long> {
    BaseSalary findBaseSalaryById(Long id);
}
