package com.tobeto.pair5.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.tobeto.pair5.services.abstracts.GearTypeService;
import com.tobeto.pair5.services.dtos.gearType.requests.AddGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.DeleteGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.requests.UpdateGearTypeRequest;
import com.tobeto.pair5.services.dtos.gearType.responses.GetAllGearTypeResponse;

@RestController
@AllArgsConstructor
@RequestMapping("api/gear_types")
@CrossOrigin
public class GearTypesController {
    private final GearTypeService gearTypeService;
    @PostMapping("/add")
    public void add(@RequestBody @Valid AddGearTypeRequest request){
        gearTypeService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        gearTypeService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateGearTypeRequest request){
        gearTypeService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllGearTypeResponse> getAll() throws InterruptedException {
        Thread.sleep(2000);
        return gearTypeService.getAll();
    }

    @GetMapping("/getById")
    public GetAllGearTypeResponse getById(@RequestParam int id){
        return gearTypeService.getById(id);
    }
}
