package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.UserService;
import com.tobeto.pair5.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.DeleteUserRequest;
import com.tobeto.pair5.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair5.services.dtos.user.responses.GetAllUserResponse;
import com.tobeto.pair5.services.dtos.user.responses.GetByIdUserResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {
    private final UserService userService;

    @PostMapping("/add")
    public void add(@RequestBody @Valid AddUserRequest request){
        userService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        userService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateUserRequest request){
        userService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllUserResponse> getAll(){
        return userService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdUserResponse getById(@RequestParam int id){
        return userService.getById(id);
    }

    @GetMapping("/getByEmail")
    public GetByIdUserResponse getByEmail(String email){
        return userService.getByEmail(email);
    }
}
