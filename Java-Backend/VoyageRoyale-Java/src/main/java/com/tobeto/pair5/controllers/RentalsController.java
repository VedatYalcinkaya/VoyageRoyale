package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.RentalService;
import com.tobeto.pair5.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.DeleteRentalRequest;
import com.tobeto.pair5.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair5.services.dtos.rental.responses.GetAllRentalResponse;
import com.tobeto.pair5.services.dtos.rental.responses.GetByIdRentalResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/rentals")
public class RentalsController {
    private final RentalService rentalService;

    @PostMapping("/add")
    public void add(@RequestBody @Valid AddRentalRequest request){
        rentalService.add(request);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid DeleteRentalRequest request){
        rentalService.delete(request);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateRentalRequest request){
        rentalService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllRentalResponse> getAll(){
        return rentalService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdRentalResponse getById(@RequestParam int id){
        return rentalService.getById(id);
    }
}
