package com.yiche.Entity;

import java.util.Date;

public class YearJoinModelColorEntity {
    private Integer Id;
    private Integer ModelId;
    private Integer Year;
    private Integer ColorId;
    private Date CreateTime;

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

    public Integer getYear() {
        return Year;
    }

    public void setYear(Integer year) {
        Year = year;
    }

    public Integer getColorId() {
        return ColorId;
    }

    public void setColorId(Integer colorId) {
        ColorId = colorId;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }
}
