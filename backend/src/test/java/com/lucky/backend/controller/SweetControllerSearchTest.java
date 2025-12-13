package com.lucky.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.lucky.backend.service.SweetService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SweetController.class)
@AutoConfigureMockMvc(addFilters = false)
class SweetControllerSearchTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SweetService sweetService; // ✅ REQUIRED

    @Test
    void searchSweets_shouldReturn200() throws Exception {
        mockMvc.perform(
                get("/api/sweets/search")
                        .param("name", "laddu")
                        .param("category", "festival")
                        .param("minPrice", "10")
                        .param("maxPrice", "100")
        ).andExpect(status().isOk());
    }
}
