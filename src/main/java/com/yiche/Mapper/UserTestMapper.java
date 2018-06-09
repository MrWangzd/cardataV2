package com.yiche.Mapper;

import com.yiche.Entity.UserTest;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTestMapper {
    @Select("SELECT * FROM t_user WHERE user_id = #{id}")
    UserTest getUserById(Integer id);

    @Select("SELECT * FROM t_user")
    public List<UserTest> getUserList();

    @Insert("insert into t_user(user_name, password, phone) values(#{user_name}, #{password}, #{phone})")
    public int add(UserTest userTest);

    @Update("UPDATE t_user SET user_name = #{userTest.user_name} , password = #{userTest.password} , phone = #{userTest.phone} WHERE user_id = #{id}")
    public int update(@Param("id") Integer id, @Param("userTest") UserTest userTest);

    @Delete("DELETE from t_user where user_id = #{id} ")
    public int delete(Integer id);
}
