package com.yiche.Service;

import com.yiche.Entity.UserTest;

import java.util.List;

public interface EmailLogReceiverService {
    UserTest getUserById(Integer id);

    public List<UserTest> getUserList();

    public int add(UserTest userTest);

    public int update(Integer id, UserTest userTest);

    public int delete(Integer id);
}
