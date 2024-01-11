package com.tobeto.pair5.services.dtos.model.requests;

import com.tobeto.pair5.services.dtos.brand.responses.GetBrandIdResponse;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddModelRequest {

    @NotNull(message = "Name field can not be empty")
    @Size(min = 2,message = "Model name must be at least 2 characters!")
    private String name;

    private GetBrandIdResponse brand;
}
