package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
}
