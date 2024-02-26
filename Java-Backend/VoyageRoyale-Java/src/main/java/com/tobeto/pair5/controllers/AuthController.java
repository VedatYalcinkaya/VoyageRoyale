package com.tobeto.pair5.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.pair5.services.abstracts.AuthenticationService;
import com.tobeto.pair5.services.dtos.auth.requests.AuthenticationRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CorporateRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CustomerRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.responses.AuthenticationResponse;
import com.tobeto.pair5.services.dtos.token.responses.RefreshTokenResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthenticationService service;

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping("/customerRegister")
    public ResponseEntity<AuthenticationResponse> customerRegister(
            @RequestBody CustomerRegisterRequest request
    ){
        return ResponseEntity.ok(service.customerRegister(request));
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping("/corporateRegister")
    public ResponseEntity<AuthenticationResponse> corporateRegister(
            @RequestBody CorporateRegisterRequest request
    ){
        return ResponseEntity.ok(service.corporateCustomerRegister(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));

    }
    @PostMapping("/refreshToken")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);

        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = objectMapper.writeValueAsString(new RefreshTokenResponse("NewAccessToken", "NewRefreshToken"));

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());

        return ResponseEntity.ok().body(responseBody);
    }
}
