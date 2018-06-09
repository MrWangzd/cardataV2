package com.yiche.Entity;

import java.util.Date;

public class SaleStatusRecordEntity {
    private Integer Id;
    private Integer CarType;
    private Integer StopSellCount;
    private Integer WaitForSaleCount;
    private Integer SellCount;
    private Integer ToBeCheckedCount;
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

    public Integer getStopSellCount() {
        return StopSellCount;
    }

    public void setStopSellCount(Integer stopSellCount) {
        StopSellCount = stopSellCount;
    }

    public Integer getWaitForSaleCount() {
        return WaitForSaleCount;
    }

    public void setWaitForSaleCount(Integer waitForSaleCount) {
        WaitForSaleCount = waitForSaleCount;
    }

    public Integer getSellCount() {
        return SellCount;
    }

    public void setSellCount(Integer sellCount) {
        SellCount = sellCount;
    }

    public Integer getToBeCheckedCount() {
        return ToBeCheckedCount;
    }

    public void setToBeCheckedCount(Integer toBeCheckedCount) {
        ToBeCheckedCount = toBeCheckedCount;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }
}
