package com.example.demo.api.repository;

import com.example.demo.api.entities.WorkingHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkingHoursRepository extends JpaRepository<WorkingHours, Long> {
    WorkingHours findWorkingHoursById(long id);
}
