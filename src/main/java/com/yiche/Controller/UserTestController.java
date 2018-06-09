package com.yiche.Controller;

import com.yiche.Entity.JsonResult;
import com.yiche.Entity.UserTest;
import com.yiche.Service.UserTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserTestController {
    @Autowired
    @Qualifier("userService1")
    private UserTestService userTestService;
    /**
     * 添加用户
     * @param userTest
     * @return
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<JsonResult> add (@RequestBody UserTest userTest){
        JsonResult r = new JsonResult();
        try {
            int orderId = userTestService.add(userTest);
            if (orderId < 0) {
                r.setResult(orderId);
                r.setStatus("fail");
            } else {
                r.setResult(orderId);
                r.setStatus("ok");
            }
        } catch (Exception e) {
            r.setResult(e.getClass().getName() + ":" + e.getMessage());
            r.setStatus("error");
            e.printStackTrace();
        }
        return ResponseEntity.ok(r);
    }
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public String GetData(){
        List<UserTest> userTests = userTestService.getUserList();
        return userTests.get(0).getPhone();
    }
}
