package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.AuthenticationService;
import com.tobeto.pair5.services.dtos.auth.requests.AuthenticationRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CorporateRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CustomerRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.responses.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
//DENEME

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
}
