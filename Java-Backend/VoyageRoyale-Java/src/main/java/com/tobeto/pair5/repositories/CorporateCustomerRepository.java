package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.CorporateCustomer;
import com.tobeto.pair5.entities.concretes.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CorporateCustomerRepository extends JpaRepository<CorporateCustomer,Integer> {
    Optional<CorporateCustomer> findByUserEmail(String UserEmail);
}
