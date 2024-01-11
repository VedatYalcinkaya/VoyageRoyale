package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "customers")
@Entity
@Getter
@Setter
public class Customer extends BaseEntity {

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @ManyToOne()
    @JoinColumn(name="user_id")
    private User user;
}
