package com.yiche.Controller;

import com.yiche.Entity.UserTest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class StyleController {

    @RequestMapping(value = {"/style"},method = RequestMethod.GET)
    public String index(Model model){
        return "style/index";
    }
}
