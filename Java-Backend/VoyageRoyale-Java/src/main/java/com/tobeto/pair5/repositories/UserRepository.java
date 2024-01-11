package com.tobeto.pair5.repositories;

import com.tobeto.pair5.entities.concretes.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
