package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.model.Music;
import com.snapgram.backend.app.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MusicController {

    private final MusicService musicService;

    @GetMapping
    public List<Music> getAllMusics() {
        return musicService.getAllMusics();
    }
}