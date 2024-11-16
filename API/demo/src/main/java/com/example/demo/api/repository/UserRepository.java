package com.example.demo.api.repository;

import com.example.demo.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(long id);
    User findUserByEmail(String email);
    User findUserByUsername(String username);
    User findUserByPhoneNumber(String phoneNumber);
    User findUserByEmailAndPhoneNumber(String email, String phoneNumber);
}
