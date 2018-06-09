package com.yiche.Entity;

import java.util.Date;

public class StyleSaleStatusTaskEntity {
    public Integer getStyleId() {
        return StyleId;
    }

    public void setStyleId(Integer styleId) {
        StyleId = styleId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }

    private Integer StyleId;
    private String UserName;
    private Date UpdateTime;
}
