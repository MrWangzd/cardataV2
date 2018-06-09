package com.yiche.Entity;

import java.util.Date;

public class RoleJoinAuthorityEntity {
    private Integer Id;
    private Integer RoleId;
    private Integer AuthorityId;
    private Date CreateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getRoleId() {
        return RoleId;
    }

    public void setRoleId(Integer roleId) {
        RoleId = roleId;
    }

    public Integer getAuthorityId() {
        return AuthorityId;
    }

    public void setAuthorityId(Integer authorityId) {
        AuthorityId = authorityId;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }
}
