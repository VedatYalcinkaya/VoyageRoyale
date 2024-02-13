package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
   Optional<Customer> findByUserEmail(String customerEmail);
   Optional<Customer> findByTcNo(String tcNo);
}
