package com.snapgram.backend.app.service;

import com.snapgram.backend.app.dto.request.LoginRequest;
import com.snapgram.backend.app.dto.request.RegisterRequest;
import com.snapgram.backend.app.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}