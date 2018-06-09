package com.yiche.Entity;

import java.util.Date;

public class StyleEntity {
    private Integer Id;
    private Integer ModelId;
    private Integer Year;
    private String Name;
    private Integer StyleBodyType;
    private Integer ProductionStatus;
    private Integer SaleStatus;
    private Date TimeToMarket;
    private Integer NowMsrp;
    private String SpellFirst;
    private Integer IsEnabled;
    private Integer IsRemoved;
    private Date UpdateTime;
    private Date CreateTime;
    private Integer IsWagon;
    private Integer StyleTag;

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

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Integer getStyleBodyType() {
        return StyleBodyType;
    }

    public void setStyleBodyType(Integer styleBodyType) {
        StyleBodyType = styleBodyType;
    }

    public Integer getProductionStatus() {
        return ProductionStatus;
    }

    public void setProductionStatus(Integer productionStatus) {
        ProductionStatus = productionStatus;
    }

    public Integer getSaleStatus() {
        return SaleStatus;
    }

    public void setSaleStatus(Integer saleStatus) {
        SaleStatus = saleStatus;
    }

    public Date getTimeToMarket() {
        return TimeToMarket;
    }

    public void setTimeToMarket(Date timeToMarket) {
        TimeToMarket = timeToMarket;
    }

    public Integer getNowMsrp() {
        return NowMsrp;
    }

    public void setNowMsrp(Integer nowMsrp) {
        NowMsrp = nowMsrp;
    }

    public String getSpellFirst() {
        return SpellFirst;
    }

    public void setSpellFirst(String spellFirst) {
        SpellFirst = spellFirst;
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

    public Integer getIsWagon() {
        return IsWagon;
    }

    public void setIsWagon(Integer isWagon) {
        IsWagon = isWagon;
    }

    public Integer getStyleTag() {
        return StyleTag;
    }

    public void setStyleTag(Integer styleTag) {
        StyleTag = styleTag;
    }
}
