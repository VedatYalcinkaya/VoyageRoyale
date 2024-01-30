package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    boolean existsByName(String name);
    boolean existsByNameIgnoreCase(String name);

    Optional<Color> findByName(String name);
}
