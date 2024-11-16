package com.example.demo.api.service;

import com.example.demo.api.entities.StaffMonthlySalary;
import com.example.demo.api.repository.StaffMonthlySalaryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffMonthlySalaryService {

    @Autowired
    StaffMonthlySalaryRepository staffMonthlySalaryRepository;

    public StaffMonthlySalary create(StaffMonthlySalary staffMonthlySalary) {
        StaffMonthlySalary newStaffMonthlySalary = staffMonthlySalaryRepository.save(staffMonthlySalary);
        return newStaffMonthlySalary;
    }

    public List<StaffMonthlySalary> getAllStaffMonthlySalary() {
        List<StaffMonthlySalary> staffMonthlySalaries = staffMonthlySalaryRepository.findAll();
        return staffMonthlySalaries;
    }

    public StaffMonthlySalary update(long id, StaffMonthlySalary staffMonthlySalary) {
        StaffMonthlySalary oldStaffMonthlySalary = getStaffMonthlySalaryById(id);

        oldStaffMonthlySalary.setUser(staffMonthlySalary.getUser());
        oldStaffMonthlySalary.setBaseSalaryAmount(staffMonthlySalary.getBaseSalaryAmount());
        oldStaffMonthlySalary.setBonuses(staffMonthlySalary.getBonuses());
        oldStaffMonthlySalary.setTotalSalary(staffMonthlySalary.getTotalSalary());
        oldStaffMonthlySalary.setMonth(staffMonthlySalary.getMonth());
        oldStaffMonthlySalary.setYear(staffMonthlySalary.getYear());

        return staffMonthlySalaryRepository.save(oldStaffMonthlySalary);
    }

    public StaffMonthlySalary delete(long id) {
        StaffMonthlySalary oldStaffMonthlySalary = getStaffMonthlySalaryById(id);
        oldStaffMonthlySalary.setDeleted(true);
        return staffMonthlySalaryRepository.save(oldStaffMonthlySalary);
    }

    public StaffMonthlySalary getStaffMonthlySalaryById(long id) {
        StaffMonthlySalary oldStaffMonthlySalary = staffMonthlySalaryRepository.findStaffMonthlySalaryById(id);
        if (oldStaffMonthlySalary == null) throw new EntityNotFoundException("Staff monthly salary not found");
        return oldStaffMonthlySalary;
    }
}
