package com.lucky.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.backend.dto.RegisterRequest;
import com.lucky.backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private AuthService authService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void register_shouldReturn201_whenValidRequest() throws Exception {

		RegisterRequest request = new RegisterRequest();
		request.setEmail("test@example.com");
		request.setPassword("password123");

		mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request))).andExpect(status().isCreated());
	}
}
