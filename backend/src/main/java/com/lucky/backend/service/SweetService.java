package com.lucky.backend.service;

import org.springframework.stereotype.Service;

import com.lucky.backend.dto.SweetCreateRequest;

@Service
public interface SweetService {

    void createSweet(SweetCreateRequest request);

}
