package com.yiche.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ModelController {

    @RequestMapping(value = {"/Model/Add"},method = RequestMethod.GET)
    public String Add(Model model){
        return "Model/Add";
    }
}
