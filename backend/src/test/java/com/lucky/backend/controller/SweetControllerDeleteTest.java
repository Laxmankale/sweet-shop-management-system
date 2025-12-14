package com.lucky.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.lucky.backend.service.SweetService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SweetController.class)
@AutoConfigureMockMvc(addFilters = false)
class SweetControllerDeleteTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService;

    @MockBean
    private com.lucky.backend.service.JwtService jwtService;

    @MockBean
    private com.lucky.backend.repository.UserRepository userRepository;

    @Test
    void deleteSweet_shouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/sweets/1"))
                .andExpect(status().isNoContent());
    }
}
