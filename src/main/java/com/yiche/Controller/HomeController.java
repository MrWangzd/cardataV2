package com.yiche.Controller;

import com.yiche.Entity.JsonResult;
import com.yiche.Entity.UserTest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {
    @RequestMapping(value = {"","/login"},method = RequestMethod.GET)
    public String login(){

        return "login";
    }

    @RequestMapping(value = "/loginpost", method = RequestMethod.POST)
    public ResponseEntity<JsonResult> login (@RequestParam String userName,@RequestParam String passWord){
        JsonResult r = new JsonResult();
        if (userName == "wangzd" && passWord == "123"){
            r.setStatus("ok");
        }
        else{
            r.setStatus("fail");
        }
        return ResponseEntity.ok(r);
    }
}
