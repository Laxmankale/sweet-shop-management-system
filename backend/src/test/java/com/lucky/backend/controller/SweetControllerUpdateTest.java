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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SweetController.class)
@AutoConfigureMockMvc(addFilters = false) // disable security for controller test
class SweetControllerUpdateTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void updateSweet_shouldReturn200_whenValidRequest() throws Exception {
        SweetCreateRequest request = new SweetCreateRequest();
        request.setName("Updated Laddu");
        request.setCategory("Festival");
        request.setPrice(120.0);
        request.setQuantity(50);

        mockMvc.perform(
                put("/api/sweets/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        ).andExpect(status().isOk());
    }
}
