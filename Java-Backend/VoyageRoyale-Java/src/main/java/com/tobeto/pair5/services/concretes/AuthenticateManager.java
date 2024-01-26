package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.services.JwtService;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.User;
import com.tobeto.pair5.repositories.UserRepository;
import com.tobeto.pair5.services.abstracts.AuthenticationService;
import com.tobeto.pair5.services.abstracts.CorporateCustomerService;
import com.tobeto.pair5.services.abstracts.CustomerService;
import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.dtos.auth.requests.AuthenticationRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CorporateRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.requests.CustomerRegisterRequest;
import com.tobeto.pair5.services.dtos.auth.responses.AuthenticationResponse;
import com.tobeto.pair5.services.dtos.corporateCustomer.requests.AddCorporateCustomerRequest;
import com.tobeto.pair5.services.dtos.customer.requests.AddCustomerRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticateManager implements AuthenticationService {

    private final CustomerService customerService;
    private final CorporateCustomerService corporateCustomerService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapperService modelMapperService;
    private final JwtService jwtService;
    private final AuthenticationManager manager;
    @Override
    public AuthenticationResponse customerRegister(CustomerRegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(request.getRoles())
                .build();

        userRepository.save(user);
        AddCustomerRequest addCustomerRequest = new AddCustomerRequest();
        addCustomerRequest.setFirstName(request.getFirstName());
        addCustomerRequest.setLastName(request.getLastName());
        addCustomerRequest.setUserId(user.getId());




        customerService.add(addCustomerRequest);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse corporateCustomerRegister(CorporateRegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(request.getRoles())
                .build();

        userRepository.save(user);
        AddCorporateCustomerRequest addCorporateCustomerRequest = new AddCorporateCustomerRequest();
        addCorporateCustomerRequest.setTaxNo(request.getTaxNo());
        addCorporateCustomerRequest.setCompanyName(request.getCompanyName());
        addCorporateCustomerRequest.setUserId(user.getId());


        corporateCustomerService.add(addCorporateCustomerRequest);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userService.getByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(modelMapperService.forResponse().map(user, User.class));
        return AuthenticationResponse.builder()
                .token(jwtToken )
                .build();
    }
}
