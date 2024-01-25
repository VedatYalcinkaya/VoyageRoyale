package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car,Integer> {
    boolean existsByPlate(String plate);

    @Query("SELECT c FROM Car c WHERE c.position.id = :positionId AND NOT EXISTS (" +
            "SELECT r FROM Rental r WHERE r.car.id = c.id AND (" +
            "r.startDate BETWEEN :pickUpDate AND :returnDate OR " +
            "r.endDate BETWEEN :pickUpDate AND :returnDate OR " +
            "r.startDate <= :pickUpDate AND r.endDate >= :returnDate))")
    List<Car> findAvailableCars(
            @Param("pickUpDate") LocalDate pickUpDate,
            @Param("returnDate") LocalDate returnDate,
            @Param("positionId") int positionId
    );

    Optional<List<Car>> findByPositionId(int id);
}
