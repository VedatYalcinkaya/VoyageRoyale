package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.GearType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GearTypeRepository extends JpaRepository<GearType, Integer> {
    boolean existsByName(String name);
    boolean existsByNameIgnoreCase(String name);
}
