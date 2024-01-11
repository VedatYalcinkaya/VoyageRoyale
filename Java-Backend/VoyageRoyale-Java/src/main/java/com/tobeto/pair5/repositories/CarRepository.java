package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,Integer> {
    boolean existsByPlate(String plate);
}
