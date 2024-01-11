package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    boolean existsByName(String name);
    boolean existsByNameIgnoreCase(String name);
}
