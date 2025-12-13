package com.lucky.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.backend.dto.SweetCreateRequest;
import com.lucky.backend.service.SweetService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SweetController.class)
@AutoConfigureMockMvc(addFilters = false) // disable security for controller test
class SweetControllerCreateTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createSweet_shouldReturn201_whenValidRequest() throws Exception {

        SweetCreateRequest request = new SweetCreateRequest();
        request.setName("Gulab Jamun");
        request.setCategory("Indian");
        request.setPrice(10.0);
        request.setQuantity(50);

        mockMvc.perform(
                post("/api/sweets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
        .andExpect(status().isCreated());
    }
}
