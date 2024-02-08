package com.tobeto.pair5.core.configurations;

import com.tobeto.pair5.core.filters.JwtAuthenticationFilter;
import com.tobeto.pair5.entities.concretes.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    private static final String[] WHITE_LIST_URLS = {
            "/swagger-ui/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/api/auth/register",
            "/api/auth/authenticate",
            "/api/fileUpload/upload",
            "api/**"

    };
  

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeHttpRequests->
                        authorizeHttpRequests.requestMatchers(WHITE_LIST_URLS)
                                .permitAll()
                                .requestMatchers(HttpMethod.POST,"api/users/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/rentals/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/positions/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/models/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/fileUpload/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/invoices/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/fuel_types/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/gear_types/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/carTypes/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"api/brands/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST, "/api/cars/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.POST,"/api/colors/**").hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.GET, "/api/corporateCustomers/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"api/customers/**").hasAnyAuthority(Role.ADMIN.name())
                                .anyRequest()
                                .authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .clearAuthentication(true)
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request,response,authentication) -> SecurityContextHolder.clearContext())
                )
        ;

                return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*","http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("*","GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization","Accept-Language","Accept","Content-Type","*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
