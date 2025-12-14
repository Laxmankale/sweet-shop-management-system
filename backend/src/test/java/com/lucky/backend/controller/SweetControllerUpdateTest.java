package com.lucky.backend.controller;

import org.springframework.http.MediaType;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.backend.dto.SweetUpdateRequest;
import com.lucky.backend.entity.Sweet;
import com.lucky.backend.service.SweetService;

@WebMvcTest(SweetController.class)
@AutoConfigureMockMvc(addFilters = false)
class SweetControllerUpdateTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private SweetService sweetService;

	@MockBean
	private com.lucky.backend.service.JwtService jwtService;

	@MockBean
	private com.lucky.backend.repository.UserRepository userRepository;

	@Test
	void updateSweet_shouldReturn200_whenValidRequest() throws Exception {

		SweetUpdateRequest request = new SweetUpdateRequest();
		request.setName("Ladoo");
		request.setPrice(BigDecimal.valueOf(100));

		Sweet updated = new Sweet();
		updated.setId(1L);
		updated.setName("Ladoo");
		updated.setPrice(BigDecimal.valueOf(100));

		when(sweetService.update(anyLong(), any())).thenReturn(updated);

		mockMvc.perform(put("/api/sweets/{id}", 1L).contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request))).andExpect(status().isOk());
	}
}
