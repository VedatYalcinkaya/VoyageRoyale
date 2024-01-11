package com.tobeto.pair5.services.dtos.color.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddColorRequest {
    @NotNull(message = "Name field can not be empty!")
    @Size(min=2,message = "Color name must be at least 2 characters")
    private String name;
}
