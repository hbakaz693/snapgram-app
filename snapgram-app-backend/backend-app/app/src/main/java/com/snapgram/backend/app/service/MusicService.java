package com.snapgram.backend.app.service;

import com.snapgram.backend.app.model.Music;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class MusicService {

    private static final String BASE_URL = "http://10.79.217.144:808";

    public List<Music> getAllMusics() {

        List<Music> musics = new ArrayList<>();

        File folder = new File(
                System.getProperty("user.dir") + "/uploads/music"
        );

        if (!folder.exists()) {
            folder.mkdirs();
            return musics;
        }

        File[] files = folder.listFiles();

        if (files == null) {
            return musics;
        }

        long id = 1;

        for (File file : files) {

            if (!file.isFile()) {
                continue;
            }

            String originalFileName = file.getName();

            if (!originalFileName.endsWith(".mp3")) {
                continue;
            }

            String nameWithoutExtension =
                    originalFileName.replace(".mp3", "");

            String artist = "Unknown";
            String title = nameWithoutExtension;

            String[] parts = nameWithoutExtension.split(" - ");

            if (parts.length >= 2) {
                artist = parts[0];
                title = parts[1];
            }

            Music music = Music.builder()
                    .id(id++)
                    .title(title)
                    .artist(artist)
                    .audioUrl(BASE_URL + "/uploads/music/" + originalFileName)
                    .build();

            musics.add(music);
        }

        return musics;
    }
}