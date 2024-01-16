package com.tobeto.pair5.entities.concretes;

import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "gearTypes")
public class GearType extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "gearType")
    private List<Car> cars;

}
