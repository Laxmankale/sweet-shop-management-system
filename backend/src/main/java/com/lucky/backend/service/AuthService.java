package com.lucky.backend.service;

import com.lucky.backend.dto.LoginRequest;
import com.lucky.backend.dto.RegisterRequest;
import com.lucky.backend.entity.User;
import com.lucky.backend.exception.InvalidCredentialsException;
import com.lucky.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder encoder;
	private final JwtService jwtService;

	public AuthService(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtService) {
		super();
		this.userRepository = userRepository;
		this.encoder = encoder;
		this.jwtService = jwtService;
	}

	public User register(RegisterRequest request) {
		User user = new User();
		user.setId(UUID.randomUUID());
		user.setEmail(request.getEmail());
		user.setPasswordHash(encoder.encode(request.getPassword()));
		user.setRole("USER");

		return userRepository.save(user);
	}

	public String login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail()).orElseThrow(InvalidCredentialsException::new);

		validatePassword(request.getPassword(), user.getPasswordHash());

		return jwtService.generateToken(user);

	}

	private void validatePassword(String rawPassword, String hashedPassword) {
		if (!encoder.matches(rawPassword, hashedPassword)) {
			throw new InvalidCredentialsException();
		}
	}
}
