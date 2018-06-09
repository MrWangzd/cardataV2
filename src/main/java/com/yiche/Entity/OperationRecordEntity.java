package com.yiche.Entity;

import java.util.Date;

public class OperationRecordEntity {
    private Integer Id;
    private Integer CarType;
    private Integer AddCount;
    private Integer EditCount;
    private Date UpdateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getCarType() {
        return CarType;
    }

    public void setCarType(Integer carType) {
        CarType = carType;
    }

    public Integer getAddCount() {
        return AddCount;
    }

    public void setAddCount(Integer addCount) {
        AddCount = addCount;
    }

    public Integer getEditCount() {
        return EditCount;
    }

    public void setEditCount(Integer editCount) {
        EditCount = editCount;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }
}
