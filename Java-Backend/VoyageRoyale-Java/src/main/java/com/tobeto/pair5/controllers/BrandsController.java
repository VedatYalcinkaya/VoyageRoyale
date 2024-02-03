package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.BrandService;
import com.tobeto.pair5.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.DeleteBrandRequest;
import com.tobeto.pair5.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair5.services.dtos.brand.responses.GetAllBrandResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/brands")
@CrossOrigin
public class BrandsController {

    private final BrandService brandService;
    @PostMapping("/add")
    public void add(@RequestBody @Valid AddBrandRequest request){
        brandService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        brandService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateBrandRequest request){
        brandService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllBrandResponse> getAll(){
        return brandService.getAll();
    }

    @GetMapping("/getById")
    public GetAllBrandResponse getById(@RequestParam int id){
        return brandService.getById(id);
    }

}
