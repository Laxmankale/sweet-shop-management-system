package com.lucky.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lucky.backend.dto.SweetCreateRequest;
import com.lucky.backend.service.SweetService;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

	private final SweetService sweetService;

	public SweetController(SweetService sweetService) {
		this.sweetService = sweetService;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createSweet(@RequestBody SweetCreateRequest request) {
		sweetService.createSweet(request);
	}

	@GetMapping
	public List<String> getAllSweets() {
		return List.of(); // minimal implementation
	}

	@GetMapping("/search")
	public List<String> searchSweets(@RequestParam(required = false) String name,
			@RequestParam(required = false) String category, @RequestParam(required = false) Double minPrice,
			@RequestParam(required = false) Double maxPrice) {
		return List.of();
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void updateSweet(@PathVariable Long id, @RequestBody SweetCreateRequest request) {
		sweetService.updateSweet(id, request);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteSweet(@PathVariable Long id) {
	    sweetService.deleteSweet(id);
	}

}
