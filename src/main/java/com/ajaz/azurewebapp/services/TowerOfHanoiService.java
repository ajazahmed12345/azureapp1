package com.ajaz.azurewebapp.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TowerOfHanoiService {

    List<String> steps;

    public TowerOfHanoiService(){
        steps = new ArrayList<>();
    }

    public void solve(Integer n, String from, String to, String aux){
        if(n == 1){
            steps.add("Move 1 from: " + from + " to: " + to);
            return;
        }

        solve(n-1, from, aux, to);
        steps.add("Move "+ n +" from: " + from + " to: " + to);
        solve(n-1, aux, to, from);
    }

    public List<String> solveTowerOfHanoi(Integer n, String from, String to, String aux){
         solve(n, from, to, aux);
         return steps;
    }
}
