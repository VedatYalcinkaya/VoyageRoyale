package com.tobeto.pair5.core.utilities.exceptions.handlers;

import com.tobeto.pair5.core.utilities.exceptions.problemDetails.BusinessProblemDetails;
import com.tobeto.pair5.core.utilities.exceptions.problemDetails.ValidatonProblemDetails;
import com.tobeto.pair5.core.utilities.exceptions.types.BusinessException;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidatonProblemDetails handleValidationExceptions(MethodArgumentNotValidException exception){
        Map<String,String> validationErrors = new HashMap<>();
        exception.getBindingResult().getFieldErrors().stream().map(error->
                validationErrors.put(error.getField(), error.getDefaultMessage())).collect(Collectors.toList());

        ValidatonProblemDetails validationProblemDetails=new ValidatonProblemDetails();
        validationProblemDetails.setErrors(validationErrors);
        return validationProblemDetails;
    }

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public BusinessProblemDetails handleBusinessExceptions(BusinessException exception){
        BusinessProblemDetails businessProblemDetails = new BusinessProblemDetails();
        businessProblemDetails.setDetail(exception.getMessage());
        return businessProblemDetails;
    }

//    @ExceptionHandler({Exception.class})
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public String handleError(Exception exception){
//        return "Unknown Error!";
//    }
}



