package com.yiche.Entity;

import java.util.Date;

public class ModelColorEntity {
    private Integer Id;
    private Integer ModelId;
    private String Name;
    private String Value;
    private Integer OrderId;
    private Date UpdateTime;
    private Date CreateTime;
    private Integer ColorType;

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

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    public Integer getOrderId() {
        return OrderId;
    }

    public void setOrderId(Integer orderId) {
        OrderId = orderId;
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

    public Integer getColorType() {
        return ColorType;
    }

    public void setColorType(Integer colorType) {
        ColorType = colorType;
    }
}
