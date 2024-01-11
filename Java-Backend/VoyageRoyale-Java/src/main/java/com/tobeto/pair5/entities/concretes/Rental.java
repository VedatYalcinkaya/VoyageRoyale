package com.tobeto.pair5.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Table(name = "rentals")
@Entity
@Getter
@Setter
public class Rental extends BaseEntity {


    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "start_kilometer")
    private int startKilometer;

    @Column(name = "end_kilometer")
    private int endKilometer;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "rental")
    @JsonIgnore
    private List<Invoice> invoices;









}
