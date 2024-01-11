package com.tobeto.pair5.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "colors")
@Entity
@Getter
@Setter
public class Color extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name="code")
    private String code;

    @OneToMany(mappedBy = "color")
    @JsonIgnore
    private List<Car> cars;

}
