package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "fuel_types")
@Entity
@Getter
@Setter
public class FuelType extends BaseEntity {
    @Column(name="hybrid")
    private String hybrid;
    @Column(name="electric")
    private String electric;
    @Column(name="gasoline")
    private String gasoline;
    @Column(name="diesel")
    private String diesel;

    @OneToMany(mappedBy = "fuelType")
    private List<Car> car;
}
