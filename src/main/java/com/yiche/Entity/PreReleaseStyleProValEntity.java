package com.yiche.Entity;

import java.util.Date;

public class PreReleaseStyleProValEntity {
    private Integer Id;
    private Integer StyleId;
    private Integer PropertyId;
    private String Value;
    private Date CreateTime;
    private Date UpdateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getStyleId() {
        return StyleId;
    }

    public void setStyleId(Integer styleId) {
        StyleId = styleId;
    }

    public Integer getPropertyId() {
        return PropertyId;
    }

    public void setPropertyId(Integer propertyId) {
        PropertyId = propertyId;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }
}
