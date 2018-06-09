package com.yiche.Entity;

import java.util.Date;

public class StyleJoinColorEntity {
    private Integer Id;
    private Integer ColorId;
    private Integer StyleId;
    private Date UpdateTime;
    private Date CreateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getColorId() {
        return ColorId;
    }

    public void setColorId(Integer colorId) {
        ColorId = colorId;
    }

    public Integer getStyleId() {
        return StyleId;
    }

    public void setStyleId(Integer styleId) {
        StyleId = styleId;
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
}
