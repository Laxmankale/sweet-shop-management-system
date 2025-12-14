package com.lucky.backend.service;

import com.lucky.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

	private static final String SECRET = "c3dlZXQtc2hvcC1zZWNyZXQta2V5LWZvci1qd3QtdG9rZW4tZ2VuZXJhdGlvbi1hbmQtdmFsaWRhdGlvbg==";
	private static final long EXPIRATION = 1000 * 60 * 60; // 1 hour

	private Key getSigningKey() {
		byte[] keyBytes = java.util.Base64.getDecoder().decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(User user) {
		return Jwts.builder()
				.setSubject(user.getEmail())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256)
				.compact();
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
		return Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

}
