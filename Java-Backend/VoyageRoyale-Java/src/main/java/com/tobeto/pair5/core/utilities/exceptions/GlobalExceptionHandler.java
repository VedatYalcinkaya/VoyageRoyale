package com.tobeto.pair5.core.utilities.exceptions;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;
@Configuration
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<String> handleValidationError(MethodArgumentNotValidException exception){
        List<String> errorMessages = new ArrayList<>();

        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            errorMessages.add("Error Field : " + fieldError.getField());
            errorMessages.add(fieldError.getDefaultMessage());
            errorMessages.add("");
        }

        return errorMessages;
    }

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleRuntimeException(RuntimeException exception){
        return exception.getMessage();
    }

    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleError(Exception exception){
        return "Bilinmeyen Hata";
    }
}



