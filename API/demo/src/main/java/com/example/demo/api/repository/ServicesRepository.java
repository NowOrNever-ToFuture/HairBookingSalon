package com.example.demo.api.repository;

import com.example.demo.api.entities.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {
    Services findServicesById(long id);
    Services findServicesByServiceName(String ServiceName);

    @Query("SELECT s FROM Services s WHERE s.isDeleted = false")
    List<Services> findAllActive();


}
