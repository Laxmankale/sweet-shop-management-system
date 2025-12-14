package com.lucky.backend.service;

import com.lucky.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

	private static final String SECRET = "sweet-shop-secret-key";
	private static final long EXPIRATION = 1000 * 60 * 60; // 1 hour

	public String generateToken(User user) {
		return Jwts.builder().setSubject(user.getEmail()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();
	}

	public String extractEmail(String token) {
		return getClaims(token).getSubject();
	}

	public boolean isTokenValid(String token) {
		try {
			getClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
	}

}
