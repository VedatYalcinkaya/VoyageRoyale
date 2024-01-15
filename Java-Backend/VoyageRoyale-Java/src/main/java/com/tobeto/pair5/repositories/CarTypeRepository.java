package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.CarType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarTypeRepository extends JpaRepository<CarType,Integer> {
}
