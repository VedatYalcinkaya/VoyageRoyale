package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import com.tobeto.pair5.entities.concretes.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Builder
@Entity
@Getter
@Setter
public class User extends BaseEntity implements UserDetails {

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @JoinTable(name="roles", joinColumns = @JoinColumn(name="user_id"))
    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private List<Role> authorities;


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
