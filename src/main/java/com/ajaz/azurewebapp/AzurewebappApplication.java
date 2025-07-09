package com.ajaz.azurewebapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AzurewebappApplication {

    @GetMapping("/api/message")
    public String getMessage(){
        return "Hello Ajaz! from the first Azure web app.";
    }

    @GetMapping("/api/sudoku")
    public String solveSudoku(){
        return "Welcome to the Sudoku solver game.";
    }

    public static void main(String[] args) {
        SpringApplication.run(AzurewebappApplication.class, args);
    }

}
