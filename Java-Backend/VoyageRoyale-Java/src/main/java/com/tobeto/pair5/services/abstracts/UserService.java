package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.entities.concretes.User;
import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.DeleteUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair5.services.dtos.user.responses.GetAllUserResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetByIdUserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User add(AddUserRequest request);
    void delete(int id);
    void update(UpdateUserRequest request);
    List<GetAllUserResponse> getAll();
    GetByIdUserResponse getById(int id);
    GetByIdUserResponse getByEmail(String email);

}
