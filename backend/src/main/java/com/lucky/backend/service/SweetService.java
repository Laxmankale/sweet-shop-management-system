package com.lucky.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lucky.backend.dto.SweetCreateRequest;
import com.lucky.backend.dto.SweetUpdateRequest;
import com.lucky.backend.entity.Sweet;
import com.lucky.backend.repository.SweetRepository;

@Service
public class SweetService {

	private final SweetRepository sweetRepository;

	public SweetService(SweetRepository sweetRepository) {
		this.sweetRepository = sweetRepository;
	}

	public Sweet update(Long id, SweetUpdateRequest request) {
		Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new RuntimeException("Sweet not found"));

		if (request.getName() != null) {
			sweet.setName(request.getName());
		}
		if (request.getPrice() != null) {
			sweet.setPrice(request.getPrice());
		}
		if (request.getQuantity() != null) {
			sweet.setQuantity(request.getQuantity());
		}

		return sweetRepository.save(sweet);
	}

	public void createSweet(SweetCreateRequest request) {

		Sweet sweet = new Sweet();
		sweet.setName(request.getName());
		sweet.setCategory(request.getCategory());
		sweet.setPrice(BigDecimal.valueOf(request.getPrice()));
		sweet.setQuantity(request.getQuantity());

		sweetRepository.save(sweet);
	}

	public List<Sweet> getAllSweets() {
		return sweetRepository.findAll();
	}

	public List<Sweet> search(String name, String category, Double minPrice, Double maxPrice) {
		if (name != null) {
			return sweetRepository.findByNameContainingIgnoreCase(name);
		}
		if (category != null) {
			return sweetRepository.findByCategoryIgnoreCase(category);
		}
		if (minPrice != null && maxPrice != null) {
			return sweetRepository.findByPriceBetween(minPrice, maxPrice);
		}
		return sweetRepository.findAll();
	}

	public void deleteSweet(Long id) {
		sweetRepository.deleteById(id);
	}

	public Sweet purchaseSweet(Long id, Integer quantity) {
		Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new RuntimeException("Sweet not found"));

		if (quantity == null || quantity <= 0) {
			throw new IllegalArgumentException("Quantity must be greater than 0");
		}

		if (sweet.getQuantity() < quantity) {
			throw new IllegalArgumentException(
					"Insufficient stock. Available: " + sweet.getQuantity() + ", Requested: " + quantity);
		}

		sweet.setQuantity(sweet.getQuantity() - quantity);
		return sweetRepository.save(sweet);
	}

	public void restockSweet(Long id) {
		Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new RuntimeException("Sweet not found"));

		sweet.setQuantity(sweet.getQuantity() + 1);
		sweetRepository.save(sweet);
	}

}
