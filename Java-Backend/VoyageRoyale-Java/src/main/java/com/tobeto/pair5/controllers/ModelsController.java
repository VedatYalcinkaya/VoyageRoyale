package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.ModelService;
import com.tobeto.pair5.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.DeleteModelRequest;
import com.tobeto.pair5.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair5.services.dtos.model.responses.GetAllModelResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/models")
@CrossOrigin
public class ModelsController {
    private final ModelService modelService;
    @PostMapping("/add")
    public void add(@RequestBody @Valid AddModelRequest request){
        modelService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        modelService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateModelRequest request){
        modelService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllModelResponse> getAll(){
        return modelService.getAll();
    }

    @GetMapping("/getById")
    public GetAllModelResponse getById(@RequestParam int id){
        return modelService.getById(id);
    }

}
