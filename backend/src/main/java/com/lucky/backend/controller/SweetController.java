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
import com.lucky.backend.dto.SweetUpdateRequest;
import com.lucky.backend.entity.Sweet;
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
	public List<Sweet> getAllSweets() {
		return sweetService.getAllSweets();
	}

	@GetMapping("/search")
	public List<Sweet> searchSweets(@RequestParam(required = false) String name,
			@RequestParam(required = false) String category, @RequestParam(required = false) Double minPrice,
			@RequestParam(required = false) Double maxPrice) {
		return sweetService.search(name, category);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Sweet updateSweet(
	        @PathVariable Long id,
	        @RequestBody SweetUpdateRequest request
	) {
	    return sweetService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteSweet(@PathVariable Long id) {
		sweetService.deleteSweet(id);
	}

	@PostMapping("/{id}/purchase")
	@ResponseStatus(HttpStatus.OK)
	public void purchaseSweet(@PathVariable Long id) {
		sweetService.purchaseSweet(id);
	}

	@PostMapping("/{id}/restock")
	@ResponseStatus(HttpStatus.OK)
	public void restockSweet(@PathVariable Long id) {
		sweetService.restockSweet(id);
	}

}
