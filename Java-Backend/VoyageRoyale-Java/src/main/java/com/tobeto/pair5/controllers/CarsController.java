package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.CarService;
import com.tobeto.pair5.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.DeleteCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair5.services.dtos.car.responses.GetAllCarResponse;
import com.tobeto.pair5.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair5.services.dtos.car.responses.GetCustomCarResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/cars")
@CrossOrigin
public class CarsController {
    private CarService carService;

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddCarRequest request){
        carService.add(request);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid DeleteCarRequest request){
        carService.delete(request);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateCarRequest request){
        carService.update(request);
    }

    @GetMapping("getAllCustom")
    public List<GetCustomCarResponse> getAllCustom(){
        return carService.getAllCustom();
    }

    @GetMapping("/getAll")
    public List<GetAllCarResponse> getAll(){
        return carService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdCarResponse getById(@RequestParam @Valid int id){
        return carService.getById(id);
    }

}
