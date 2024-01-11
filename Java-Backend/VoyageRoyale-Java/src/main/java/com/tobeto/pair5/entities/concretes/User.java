package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Table(name = "users")
@Entity
@Getter
@Setter
public class User extends BaseEntity {

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

}
