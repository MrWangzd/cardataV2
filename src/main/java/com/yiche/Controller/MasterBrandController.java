package com.yiche.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MasterBrandController {

    @RequestMapping(value = {"/MasterBrand/Add"},method = RequestMethod.GET)
    public String Add(Model model){
        return "MasterBrand/Add";
    }
}
