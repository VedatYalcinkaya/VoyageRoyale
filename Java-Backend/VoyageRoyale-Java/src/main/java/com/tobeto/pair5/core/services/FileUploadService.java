package com.tobeto.pair5.core.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface FileUploadService {
    String uploadImage(MultipartFile multipartFile) throws IOException;
    File convertMultiPartToFile(MultipartFile file) throws IOException;
}
