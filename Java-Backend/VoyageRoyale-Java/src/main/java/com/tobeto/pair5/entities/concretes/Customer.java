package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Table(name = "customers")
@Entity
@Getter
@Setter
public class Customer extends BaseEntity {

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="birth_date")
    private LocalDate birthDate;

    @Column(name = "tc_no")
    private String tcNo;

    @ManyToOne()
    @JoinColumn(name="user_id")
    private User user;
}
