package com.example.demo.api.exception;

public class AuthException extends RuntimeException {
    public AuthException(String message) {
        super(message);
    }
}
