package com.tobeto.pair5.services.concretes;

import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import com.tobeto.pair5.core.utilities.mappers.ModelMapperService;
import com.tobeto.pair5.entities.concretes.Position;
import com.tobeto.pair5.repositories.PositionRespository;
import com.tobeto.pair5.services.abstracts.PositionService;
import com.tobeto.pair5.services.constants.Messages;
import com.tobeto.pair5.services.dtos.position.requests.AddPositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.DeletePositionRequest;
import com.tobeto.pair5.services.dtos.position.requests.UpdatePositionRequest;
import com.tobeto.pair5.services.dtos.position.responses.GetAllPositionResponse;
import com.tobeto.pair5.services.dtos.position.responses.GetPositionByIdResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PositionManager implements PositionService {

    private final PositionRespository positionRespository;
    private  final ModelMapperService modelMapperService;
    @Override
    public void add(AddPositionRequest request) {
        Position positionToAdd = modelMapperService.forRequest().map(request, Position.class);
        positionRespository.save(positionToAdd);
    }

    @Override
    public void delete(int id) {
        Position positionToDelete = positionRespository.findById(id)
                .orElseThrow(()-> new BusinessException(Messages.positionNotExist));
        positionRespository.delete(positionToDelete);
    }

    @Override
    public void update(UpdatePositionRequest request) {
        Position positionToUpdate = positionRespository.findById(request.getId()).orElseThrow(()-> new BusinessException(Messages.positionNotExist));
        this.modelMapperService.forRequest().map(request, positionToUpdate);
        positionRespository.saveAndFlush(positionToUpdate);

    }

    @Override
    public GetPositionByIdResponse getById(int id) {
        Position position = positionRespository.findById(id).orElseThrow(()-> new BusinessException(Messages.positionNotExist));
        GetPositionByIdResponse response = modelMapperService.forResponse().map(position, GetPositionByIdResponse.class);
        return response;
    }

    @Override
    public List<GetAllPositionResponse> getAll() {
        List<Position> positions = positionRespository.findAll();
        List<GetAllPositionResponse> responses =
                positions.stream()
                .map((position) -> this.modelMapperService.forResponse().map(position, GetAllPositionResponse.class)).toList();
        return responses;
    }
}
