package com.example.demo.api.service;

import com.example.demo.api.entities.WorkingHours;
import com.example.demo.api.repository.WorkingHoursRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkingHoursService {

    @Autowired
    WorkingHoursRepository workingHoursRepository;

    public WorkingHours create(WorkingHours workingHours) {
        WorkingHours newWorkingHours = workingHoursRepository.save(workingHours);
        return newWorkingHours;
    }

    public List<WorkingHours> getAllWorkingHours() {
        List<WorkingHours> workingHours = workingHoursRepository.findAll();
        return workingHours;
    }

    public WorkingHours update(long id, WorkingHours workingHours) {
        WorkingHours oldWorkingHours = getWorkingHoursById(id);

        oldWorkingHours.setDayOfWeek(workingHours.getDayOfWeek());
        oldWorkingHours.setStartTime(workingHours.getStartTime());
        oldWorkingHours.setEndTime(workingHours.getEndTime());
        oldWorkingHours.setUser(workingHours.getUser());

        return workingHoursRepository.save(oldWorkingHours);
    }

    public WorkingHours delete(long id) {
        WorkingHours oldWorkingHours = getWorkingHoursById(id);
        oldWorkingHours.setDelete(true);
        return workingHoursRepository.save(oldWorkingHours);
    }


    public WorkingHours getWorkingHoursById(long id) {
        WorkingHours oldWorkingHours = workingHoursRepository.findWorkingHoursById(id);
        if (oldWorkingHours == null) throw new EntityNotFoundException("WorkingHours not found");
        return oldWorkingHours;
    }
}
