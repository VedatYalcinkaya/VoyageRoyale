package com.tobeto.pair5.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.pair5.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
//OguzKagan
@Table(name = "brands")
@Entity
@Getter
@Setter
public class Brand extends BaseEntity {


    @Column(name = "name")
    private String name;

    @Column(name="logo_path")
    private String logoPath;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Model> models;
}
