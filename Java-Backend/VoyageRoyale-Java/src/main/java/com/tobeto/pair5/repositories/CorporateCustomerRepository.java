package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.CorporateCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporateCustomerRepository extends JpaRepository<CorporateCustomer,Integer> {
}
