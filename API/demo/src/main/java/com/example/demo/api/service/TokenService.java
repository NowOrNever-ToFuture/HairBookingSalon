package com.example.demo.api.service;

import com.example.demo.api.entities.User;
import com.example.demo.api.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Service
public class TokenService {

    @Autowired
    UserRepository userRepository;

    public final String SECRET_KEY = "Fwr6m8ovt+JrVdhofSgs0owctWxDSL0sQ5P94qyXsxaxSfbcTf4+8/m4hxTlc3DI";

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateToken(User user) {
        String token = Jwts.builder()
                .setSubject(user.getId()+"")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSigninKey())
                .compact();
        return token;
    }

    public User getUserByToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String idString = claims.getSubject();
        long id = Long.parseLong(idString);

        return userRepository.findUserById(id);
    }



}
