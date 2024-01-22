package com.tobeto.pair5.services.abstracts;

import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.DeleteUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair5.services.dtos.user.responses.GetAllUserResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetByIdUserResponse;

import java.util.List;

public interface UserService {
    void add(AddUserRequest request);
    void delete(DeleteUserRequest request);
    void update(UpdateUserRequest request);
    List<GetAllUserResponse> getAll();
    GetByIdUserResponse getById(int id);
    GetByIdUserResponse getByEmail(String email);

}
