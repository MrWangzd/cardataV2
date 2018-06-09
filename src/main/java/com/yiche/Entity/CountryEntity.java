package com.yiche.Entity;

import java.util.Date;

public class CountryEntity {
    private Integer Id;
    private String Name;
    private String NationFlag;
    private Date UpdateTime;
    private Date CreateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getNationFlag() {
        return NationFlag;
    }

    public void setNationFlag(String nationFlag) {
        NationFlag = nationFlag;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }
}
