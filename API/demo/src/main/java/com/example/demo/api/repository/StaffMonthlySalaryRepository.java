package com.example.demo.api.repository;

import com.example.demo.api.entities.StaffMonthlySalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffMonthlySalaryRepository extends JpaRepository<StaffMonthlySalary, Long> {
    StaffMonthlySalary findStaffMonthlySalaryById(long id);
}
