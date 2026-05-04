package com.snapgram.backend.app.service.impl;

import com.snapgram.backend.app.dto.request.LoginRequest;
import com.snapgram.backend.app.dto.request.RegisterRequest;
import com.snapgram.backend.app.dto.response.AuthResponse;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.UserRepository;
import com.snapgram.backend.app.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public AuthResponse register(RegisterRequest request) {


        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Vérifier si le username existe déjà
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }


        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Hachage
                .fullName(request.getFullName())
                .build();

        // 4. Sauvegarder dans la base
        User savedUser = userRepository.save(user);

        // 5. Retourner la réponse
        return AuthResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .message("User registered successfully")
                .build();
    }


    @Override
    public AuthResponse login(LoginRequest request) {

        //  Chercher l'utilisateur par email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        //  Vérifier le mot de passe
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        //  Retourner la réponse
        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .message("Login successful")
                .build();
    }
}