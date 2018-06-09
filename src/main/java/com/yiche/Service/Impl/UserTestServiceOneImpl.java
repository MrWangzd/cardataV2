package com.yiche.Service.Impl;

import com.yiche.Entity.UserTest;
import com.yiche.Mapper.UserTestMapper;
import com.yiche.Service.UserTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService2")
public class UserTestServiceOneImpl implements UserTestService {
    @Autowired
    private UserTestMapper userTestMapper;
    @Override
    public UserTest getUserById(Integer id) {
        return userTestMapper.getUserById(id);
    }

    @Override
    public List<UserTest> getUserList() {
        return userTestMapper.getUserList();
    }

    @Override
    public int add(UserTest userTest) {
        return userTestMapper.add(userTest);
    }

    @Override
    public int update(Integer id, UserTest userTest) {
        return userTestMapper.update(id, userTest);
    }

    @Override
    public int delete(Integer id) {
        return userTestMapper.delete(id);
    }
}
