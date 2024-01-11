package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, Integer> {
    boolean existsByBrand_Id(int id);

}
