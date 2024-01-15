package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "positions")
public class CarType extends BaseEntity {
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "carType")
    private List<Car> car;
}
