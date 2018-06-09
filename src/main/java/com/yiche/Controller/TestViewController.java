package com.yiche.Controller;

import com.yiche.Entity.UserTest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TestViewController {
    @RequestMapping(value = {"/say","/hi"},method = RequestMethod.GET)
    public String say(){
        return "testindex";
    }

    @RequestMapping(value = {"/jordan"},method = RequestMethod.GET)
    public String jordan(Model model){

        UserTest userTest = new UserTest();
        userTest.setUser_Id(1);
        userTest.setUser_Name("wangzd");
        userTest.setPassword("123");
        userTest.setPhone("34566");
        model.addAttribute("one", userTest);
        return "testindex";
    }

}
