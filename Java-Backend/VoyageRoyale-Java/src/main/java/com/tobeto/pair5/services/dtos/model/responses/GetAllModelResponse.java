package com.tobeto.pair5.services.dtos.model.responses;

import com.tobeto.pair5.services.dtos.brand.responses.GetAllBrandResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllModelResponse {
    private int id;
    private String name;
    private int brandId;

}
