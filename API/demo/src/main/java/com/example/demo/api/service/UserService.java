package com.example.demo.api.service;


import com.example.demo.api.dtos.request.UserRequest.UserRequest;
import com.example.demo.api.entities.User;
import com.example.demo.api.exception.DuplicateEntity;
import com.example.demo.api.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthenticationService authenticationService;
    //Create

    public User createNewUser(UserRequest userRequest) {
        try{
            User user = modelMapper.map(userRequest, User.class);

            User signInRequest = authenticationService.getCurrentUser();
            user.setUser(signInRequest);

            User newUser = userRepository.save(user);
            return newUser;
        } catch (Exception e){
            throw new DuplicateEntity("Duplicate user");
        }
    }

    //Read
    public List<User> getAllUser() {
        List<User> users = userRepository.findAll();
        return users;
    }

    //Update
    public User update(long id, User user) {
        User oldUser = getUserById(id);

        oldUser.setUsername(user.getUsername());
        oldUser.setEmail(user.getEmail());
        oldUser.setDateOfBirth(user.getDateOfBirth());
        oldUser.setPhoneNumber(user.getPhoneNumber());
        oldUser.setPassword(user.getPassword());
        oldUser.setRole(user.getRole());
        oldUser.setBranch(user.getBranch());
        oldUser.setStaffSpecialty(user.getStaffSpecialty());
        oldUser.setBaseSalary(user.getBaseSalary());

        return userRepository.save(oldUser);
    }



    //Delete
    public User delete(long id) {
        User oldUser = getUserById(id);
        oldUser.setDeleted(true);
        return userRepository.save(oldUser);
    }

    public User getUserById(long id) {
        User oldUser = userRepository.findUserById(id);
        if (oldUser == null) throw new EntityNotFoundException("User not found");
        return oldUser;
    }



}
