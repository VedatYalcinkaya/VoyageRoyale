package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.CarTypeService;
import com.tobeto.pair5.services.dtos.carType.requests.AddCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.DeleteCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.requests.UpdateCarTypeRequest;
import com.tobeto.pair5.services.dtos.carType.responses.GetAllCarTypeResponse;
import com.tobeto.pair5.services.dtos.carType.responses.GetCarTypeByIdResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/carTypes")
@CrossOrigin
public class CarTypeController {
    private final CarTypeService carTypeService;

    @PostMapping( "add")
    public void add(@RequestBody @Valid AddCarTypeRequest request){
        carTypeService.add(request);
    }

    @DeleteMapping("delete")
    public void delete(@RequestBody @Valid DeleteCarTypeRequest request){
        carTypeService.delete(request);
    }

    @PutMapping( "put")
    public void update(@RequestBody @Valid UpdateCarTypeRequest request){
        carTypeService.update(request);
    }


    @GetMapping("getById")
    public GetCarTypeByIdResponse getById(@RequestParam int id){
        return carTypeService.getById(id);
    }

    @GetMapping("getAll")
    public List<GetAllCarTypeResponse> getAll(){
        return carTypeService.getAll();
    }
}
