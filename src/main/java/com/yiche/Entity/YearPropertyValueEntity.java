package com.yiche.Entity;

import java.util.Date;

public class YearPropertyValueEntity {
    private Integer Id;
    private Integer ModelId;
    private String YearName;
    private Integer PropertyId;
    private String PropertyValue;
    private Date CreateTime;
    private Date UpdateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getModelId() {
        return ModelId;
    }

    public void setModelId(Integer modelId) {
        ModelId = modelId;
    }

    public String getYearName() {
        return YearName;
    }

    public void setYearName(String yearName) {
        YearName = yearName;
    }

    public Integer getPropertyId() {
        return PropertyId;
    }

    public void setPropertyId(Integer propertyId) {
        PropertyId = propertyId;
    }

    public String getPropertyValue() {
        return PropertyValue;
    }

    public void setPropertyValue(String propertyValue) {
        PropertyValue = propertyValue;
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
