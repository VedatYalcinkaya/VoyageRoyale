package com.tobeto.pair5.core.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FileUploadManager implements FileUploadService{

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile multipartFile) throws IOException {
        File uploadedFile = convertMultiPartToFile(multipartFile);
        Map uploadResult = cloudinary.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
        uploadedFile.delete(); // Geçici dosyayı sil
        return uploadResult.get("url").toString();
    }

    @Override
    public File convertMultiPartToFile(MultipartFile multipartFile) throws IOException {
        File convFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(multipartFile.getBytes());
        fos.close();
        return convFile;
    }


}
