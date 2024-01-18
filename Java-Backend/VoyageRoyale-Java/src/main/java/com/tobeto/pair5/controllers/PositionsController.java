package com.tobeto.pair5.controllers;

import com.tobeto.pair5.services.abstracts.PositionService;
import com.tobeto.pair5.services.dtos.position.requests.AddPositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.DeletePositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.UpdatePositionRequest;
import com.tobeto.pair5.services.dtos.position.responses.GetAllPositionResponse;
import com.tobeto.pair5.services.dtos.position.responses.GetPositionByIdResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/positions")
@CrossOrigin
public class PositionsController {
    private final PositionService positionService;

    @PostMapping( "add")
    public void add(@RequestBody @Valid AddPositionRequest request){
        positionService.add(request);
    }

    @DeleteMapping("delete")
    public void delete(@RequestBody @Valid DeletePositionRequest request){
        positionService.delete(request);
    }

    @PutMapping( "put")
    public void update(@RequestBody @Valid UpdatePositionRequest request){
        positionService.update(request);
    }


    @GetMapping("getById")
    public GetPositionByIdResponse getById(@RequestParam int id){
        return positionService.getById(id);
    }

    @GetMapping("getAll")
    public List<GetAllPositionResponse> getAll(){
        return positionService.getAll();
    }
}
