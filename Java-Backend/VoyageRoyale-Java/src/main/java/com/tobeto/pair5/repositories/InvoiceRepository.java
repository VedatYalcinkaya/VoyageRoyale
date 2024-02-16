package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    Optional<Invoice> findByRentalId(int id);
}
