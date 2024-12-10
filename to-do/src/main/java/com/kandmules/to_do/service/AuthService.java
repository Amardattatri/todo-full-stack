package com.kandmules.to_do.service;

import com.kandmules.to_do.entity.User;
import com.kandmules.to_do.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(String username, String email, String password) {
        try {
            if (userRepository.findByUsername(username).isPresent()) {
                throw new IllegalArgumentException("User already registered to To-Do.");
            }
            User user = new User(null, username, passwordEncoder.encode(password), email);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Database or SQL error: " + e.getMessage());
        }
    }

    public User authenticateUser(String username, String password) {
        try {
            User user = userRepository.findByUsername(username).
                    orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new IllegalArgumentException("Invalid username or password.");
            }
            return user;
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid username or password. " + e.getMessage());
        }
    }
}
