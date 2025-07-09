package com.ajaz.azurewebapp;

import com.ajaz.azurewebapp.services.TowerOfHanoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class AzurewebappApplication {

    @Autowired
    private TowerOfHanoiService service;

    @GetMapping("/api/message")
    public String getMessage(){
        return "forward:/index.html";
    }

    @GetMapping("/api/toh/{n}/{from}/{to}/{aux}")
    public List<String> solveTowerOfHanoi(@PathVariable Integer n, @PathVariable String from, @PathVariable String to,
                                         @PathVariable String aux){
        return service.solveTowerOfHanoi(n, from, to, aux);
    }



    public static void main(String[] args) {
        SpringApplication.run(AzurewebappApplication.class, args);
    }

}
