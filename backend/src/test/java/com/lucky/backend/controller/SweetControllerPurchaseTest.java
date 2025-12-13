package com.lucky.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.lucky.backend.service.SweetService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SweetController.class)
@AutoConfigureMockMvc(addFilters = false) // disable security
class SweetControllerPurchaseTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService;

    @Test
    void purchaseSweet_shouldReturn200() throws Exception {
        mockMvc.perform(post("/api/sweets/{id}/purchase", 1L))
               .andExpect(status().isOk());
    }
}
