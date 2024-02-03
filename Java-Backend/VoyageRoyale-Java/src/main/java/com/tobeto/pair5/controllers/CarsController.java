package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.CarService;
import com.tobeto.pair5.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.DeleteCarRequest;
import com.tobeto.pair5.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair5.services.dtos.car.responses.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        carService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateCarRequest request){
        carService.update(request);
    }

    @GetMapping("/getAllCustom")
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

    @GetMapping("/getByReservationInputs")
    public List<GetCarsByPickUpDateAndReturnDateAndPosition> getCarsByReservationInputs(
            @RequestParam("pickUpDate") @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate pickUpDate,
            @RequestParam("returnDate") @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate returnDate,
            @RequestParam @Valid int positionId) {
        return carService.getCarsByReservationInputs(pickUpDate,returnDate,positionId);
    }

    @GetMapping("/getCarsByPositionId")
    public List<GetCarsByPositionIdResponse> getCarsByPositionId(@RequestParam @Valid int id ) {
        return carService.getCarsByPositionId(id);
    }
}
