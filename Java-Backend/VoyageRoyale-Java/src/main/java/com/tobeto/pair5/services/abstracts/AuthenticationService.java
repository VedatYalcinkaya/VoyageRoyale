package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.auth.requests.AuthenticationRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CorporateRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CustomerRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.responses.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse customerRegister(CustomerRegisterRequest request);

    AuthenticationResponse corporateCustomerRegister(CorporateRegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
