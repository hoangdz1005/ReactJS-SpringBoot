package com.codewithme.backend.controller;

import com.codewithme.backend.exception.UserNotFoundException;
import com.codewithme.backend.model.User;
import com.codewithme.backend.repository.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/user")
    User newUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    @GetMapping("/users")
    List<User> getAllUser() {
        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable long id) {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + "has been deleted successful";
    }
}
