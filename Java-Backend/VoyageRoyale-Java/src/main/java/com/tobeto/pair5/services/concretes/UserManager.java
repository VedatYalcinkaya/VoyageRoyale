package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.User;
import com.tobeto.pair5.repositories.UserRepository;
import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.DeleteUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair5.services.dtos.user.responses.GetAllUserResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetByIdUserResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService modelMapperService;
    @Override
    public void add(AddUserRequest request) {
        User user = this.modelMapperService.forRequest().map(request, User.class);
        this.userRepository.save(user);
    }

    @Override
    public void delete(DeleteUserRequest request) {
        User userToDelete = userRepository.findById(request.getId()).orElseThrow();
        userRepository.delete(userToDelete);
    }

    @Override
    public void update(UpdateUserRequest request) {
        User userToUpdate = userRepository.findById(request.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(request, userToUpdate);
        userRepository.saveAndFlush(userToUpdate);
    }

    @Override
    public List<GetAllUserResponse> getAll() {
        List<User> users = userRepository.findAll();
        List<GetAllUserResponse> responses = users.stream().map(user -> this.modelMapperService.forResponse().map(user, GetAllUserResponse.class))
                .toList();
        return responses;
    }

    @Override
    public GetByIdUserResponse getById(int id) {
        User user = userRepository.findById(id).orElseThrow();
        GetByIdUserResponse response = this.modelMapperService.forResponse().map(user, GetByIdUserResponse.class);
        return response;
    }

    @Override
    public GetByIdUserResponse getByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        GetByIdUserResponse response = this.modelMapperService.forResponse().map(user,GetByIdUserResponse.class);
        return response;
    }
}
