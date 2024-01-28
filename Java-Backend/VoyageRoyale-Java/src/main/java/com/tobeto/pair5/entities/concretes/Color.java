package com.tobeto.pair5.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "colors")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Color extends BaseEntity {

    public Color(String name, String code) {
        this.name = name;
        this.code = code;
    }

    @Column(name = "name")
    private String name;

    @Column(name="code")
    private String code;

    @OneToMany(mappedBy = "color")
    @JsonIgnore
    private List<Car> cars;

}
