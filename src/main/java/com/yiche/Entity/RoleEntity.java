package com.yiche.Entity;

import java.util.Date;

public class RoleEntity {
    private Integer Id;
    private String Name;
    private String Description;
    private Integer IsEnabled;
    private Integer IsRemoved;
    private Date CreateTime;
    private Integer Priority;

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

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Integer getIsEnabled() {
        return IsEnabled;
    }

    public void setIsEnabled(Integer isEnabled) {
        IsEnabled = isEnabled;
    }

    public Integer getIsRemoved() {
        return IsRemoved;
    }

    public void setIsRemoved(Integer isRemoved) {
        IsRemoved = isRemoved;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public Integer getPriority() {
        return Priority;
    }

    public void setPriority(Integer priority) {
        Priority = priority;
    }
}
