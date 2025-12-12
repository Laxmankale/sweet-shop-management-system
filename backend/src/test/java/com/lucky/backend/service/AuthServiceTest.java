package com.lucky.backend.service;

import com.lucky.backend.dto.RegisterRequest;
import com.lucky.backend.entity.User;
import com.lucky.backend.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.UUID;

public class AuthServiceTest {

    @Test
    void register_shouldHashPassword_andSaveUser() {

        UserRepository repo = mock(UserRepository.class);
        PasswordEncoder encoder = mock(PasswordEncoder.class);

        AuthService service = new AuthService(repo, encoder, null); // JwtService not needed now

        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("password123");

        when(encoder.encode("password123")).thenReturn("hashed-pass");

        User saved = new User();
        saved.setId(UUID.randomUUID());
        saved.setEmail("test@example.com");
        saved.setPasswordHash("hashed-pass");

        when(repo.save(any(User.class))).thenReturn(saved);

        User result = service.register(request);

        assertEquals("hashed-pass", result.getPasswordHash());
        verify(encoder, times(1)).encode("password123");
        verify(repo, times(1)).save(any(User.class));
    }
}
