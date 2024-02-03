package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.ColorService;
import com.tobeto.pair5.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.DeleteColorRequest;
import com.tobeto.pair5.services.dtos.color.requests.UpdateColorRequest;
import com.tobeto.pair5.services.dtos.color.responses.GetAllColorResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/colors")
@CrossOrigin
public class ColorsController {
    private final ColorService colorService;

    @PostMapping("/add")
    public void add(@RequestBody @Valid AddColorRequest request){
        colorService.add(request);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable @Valid int id){
        colorService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody @Valid UpdateColorRequest request){
        colorService.update(request);
    }

    @GetMapping("/getAll")
    public List<GetAllColorResponse> getAll(){
        return colorService.getAll();
    }

    @GetMapping("/getById")
    public GetAllColorResponse getById(@RequestParam int id){
        return colorService.getById(id);
    }

}
