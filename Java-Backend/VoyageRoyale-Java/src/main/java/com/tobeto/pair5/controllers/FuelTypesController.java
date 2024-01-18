package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.FuelTypeService;
import com.tobeto.pair5.services.dtos.fuelType.requests.AddFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.DeleteFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.requests.UpdateFuelTypeRequest;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetAllFuelTypeResponse;
import com.tobeto.pair5.services.dtos.fuelType.responses.GetFuelTypeByIdResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/fuel_types")
@CrossOrigin
public class FuelTypesController {
    private final FuelTypeService fuelTypeService;

    @PostMapping("/add")
    public void add(@RequestBody @Valid AddFuelTypeRequest request){
        fuelTypeService.add(request);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid DeleteFuelTypeRequest request){
        fuelTypeService.delete(request);
    }

    @PutMapping("/put")
    public void update(@RequestBody @Valid UpdateFuelTypeRequest request){
        fuelTypeService.update(request);
    }

    @GetMapping("/getById")
    public GetFuelTypeByIdResponse getById(@RequestParam int id){
        return fuelTypeService.getById(id);
    }

    @GetMapping("/getAll")
    public List<GetAllFuelTypeResponse> getAll(){
        return fuelTypeService.getAll();
    }
}
