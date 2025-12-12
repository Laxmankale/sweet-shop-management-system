package com.lucky.backend.service;

import com.lucky.backend.dto.LoginRequest;
import com.lucky.backend.entity.User;
import com.lucky.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceLoginTest {

    @Test
    void login_shouldReturnJwtToken_whenCredentialsAreValid() {

        UserRepository repo = mock(UserRepository.class);
        PasswordEncoder encoder = mock(PasswordEncoder.class);
        JwtService jwt = mock(JwtService.class);

        AuthService service = new AuthService(repo, encoder, jwt);

        LoginRequest req = new LoginRequest();
        req.setEmail("test@example.com");
        req.setPassword("password123");

        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@example.com");
        user.setPasswordHash("hashed-pass");

        when(repo.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(encoder.matches("password123", "hashed-pass")).thenReturn(true);
        when(jwt.generateToken(user)).thenReturn("jwt-token-123");

        String result = service.login(req);

        assertEquals("jwt-token-123", result);
    }
}
