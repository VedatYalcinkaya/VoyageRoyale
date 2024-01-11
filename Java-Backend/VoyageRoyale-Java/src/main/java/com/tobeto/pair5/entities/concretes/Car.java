package com.tobeto.pair5.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "cars")
@Entity
@Getter
@Setter
public class Car extends BaseEntity {

    @Column(name="model_year")
    private short modelYear;

    @Column(name="plate")
    private String plate;

    @Column(name="min_findeks_rate")
    private short minFindeksRate;

    @Column(name="kilometer")
    private Long kilometer;

    @Column(name="daily_price")
    private Float dailyPrice;

    @Column(name="image_path")
    private String imagePath;

    @ManyToOne()
    @JoinColumn(name="model_id")
    private Model model;

    @OneToMany(mappedBy = "car")
    private List<Rental> rentals;

    @ManyToOne
    @JoinColumn(name="color_id")
    private Color color;

}
