package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRespository extends JpaRepository<Position,Integer> {
}
