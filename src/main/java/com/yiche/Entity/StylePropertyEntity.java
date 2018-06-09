package com.yiche.Entity;

import java.util.Date;

public class StylePropertyEntity {
    private Integer Id;
    private Integer GroupId;
    private String Name;
    private String EnglishName;
    private Integer IsEnabled;
    private String PropertyValueSchema;
    private Date UpdateTime;
    private Date CreateTime;
    private Integer OrderId;
    private String DataExpress;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getGroupId() {
        return GroupId;
    }

    public void setGroupId(Integer groupId) {
        GroupId = groupId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEnglishName() {
        return EnglishName;
    }

    public void setEnglishName(String englishName) {
        EnglishName = englishName;
    }

    public Integer getIsEnabled() {
        return IsEnabled;
    }

    public void setIsEnabled(Integer isEnabled) {
        IsEnabled = isEnabled;
    }

    public String getPropertyValueSchema() {
        return PropertyValueSchema;
    }

    public void setPropertyValueSchema(String propertyValueSchema) {
        PropertyValueSchema = propertyValueSchema;
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

    public Integer getOrderId() {
        return OrderId;
    }

    public void setOrderId(Integer orderId) {
        OrderId = orderId;
    }

    public String getDataExpress() {
        return DataExpress;
    }

    public void setDataExpress(String dataExpress) {
        DataExpress = dataExpress;
    }
}
