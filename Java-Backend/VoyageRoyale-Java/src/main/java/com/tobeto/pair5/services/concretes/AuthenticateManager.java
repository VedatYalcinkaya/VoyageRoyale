package com.tobeto.pair5.services.concretes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.pair5.core.services.JwtService;
import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Token;
import com.tobeto.pair5.entities.concretes.User;
import com.tobeto.pair5.entities.concretes.enums.TokenType;
import com.tobeto.pair5.repositories.TokenRepository;
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
import com.tobeto.pair5.services.dtos.token.responses.RefreshTokenResponse;
import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@AllArgsConstructor
public class AuthenticateManager implements AuthenticationService {

    private final CustomerService customerService;
    private final CorporateCustomerService corporateCustomerService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapperService modelMapperService;
    private final JwtService jwtService;
    private final AuthenticationManager manager;
    private final TokenRepository tokenRepository;
    @Override
    public AuthenticationResponse customerRegister(CustomerRegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(request.getAuthorities())
                .build();

        AddUserRequest addUserRequest = modelMapperService.forRequest().map(user, AddUserRequest.class);
        User savedUser = userService.add(addUserRequest);
        AddCustomerRequest addCustomerRequest = new AddCustomerRequest();
        addCustomerRequest.setFirstName(request.getFirstName());
        addCustomerRequest.setLastName(request.getLastName());
        addCustomerRequest.setUserId(savedUser.getId());
        addCustomerRequest.setTcNo(request.getTcNo());
        addCustomerRequest.setBirthDate(request.getBirthDate());

        try {
            customerService.add(addCustomerRequest);
        }catch (Exception e){
            userService.delete(savedUser.getId());
            throw new BusinessException( e.getMessage());
        }





        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(savedUser)
                .roles(request.getAuthorities())
                .build();
    }

    @Override
    public AuthenticationResponse corporateCustomerRegister(CorporateRegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(request.getAuthorities())
                .build();

        AddUserRequest addUserRequest = modelMapperService.forRequest().map(user, AddUserRequest.class);
        User savedUser = userService.add(addUserRequest);
        AddCorporateCustomerRequest addCorporateCustomerRequest = new AddCorporateCustomerRequest();
        addCorporateCustomerRequest.setTaxNo(request.getTaxNo());
        addCorporateCustomerRequest.setCompanyName(request.getCompanyName());
        addCorporateCustomerRequest.setUserId(savedUser.getId());

        try {
            corporateCustomerService.add(addCorporateCustomerRequest);
        } catch (Exception e) {
            userService.delete(savedUser.getId());
            throw new BusinessException( e.getMessage());
        }


        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(savedUser)
                .roles(request.getAuthorities())
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
        var mappedUser = modelMapperService.forResponse().map(user, User.class);
        var jwtToken = jwtService.generateToken(mappedUser);
        var refreshToken = jwtService.generateRefreshToken(mappedUser);
        revokeAllUserTokens(mappedUser);
        saveUserToken(mappedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken )
                .refreshToken(refreshToken)
                .user(mappedUser)
                .roles(mappedUser.getAuthorities())
                .build();
    }



    @Override
    public void saveUserToken(User user, String jwtToken) {

        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);

    }

    @Override
    public void revokeAllUserTokens(User user) {

        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);

    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUserName(refreshToken);
        if (userEmail != null) {
            var user = this.userService.getByEmail(userEmail);
            var mappedUser = modelMapperService.forResponse().map(user, User.class);
            if (jwtService.isTokenValid(refreshToken, mappedUser)) {
                var accessToken = jwtService.generateToken(mappedUser);
                revokeAllUserTokens(mappedUser);
                saveUserToken(mappedUser, accessToken);

                ObjectMapper objectMapper = new ObjectMapper();
                String responseBody = objectMapper.writeValueAsString(new RefreshTokenResponse(accessToken, refreshToken));

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setStatus(HttpStatus.OK.value());
                response.getWriter().write(responseBody);
            }
        }
    }

}
