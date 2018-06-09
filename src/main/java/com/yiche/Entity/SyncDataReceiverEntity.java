package com.yiche.Entity;

import java.util.Date;

public class SyncDataReceiverEntity {
    private Integer Id;
    private String ReceiverName;
    private String DllPath;
    private Integer IsEnabled;
    private String FilterRule;
    private Date UpdateTime;
    private Date CreateTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getReceiverName() {
        return ReceiverName;
    }

    public void setReceiverName(String receiverName) {
        ReceiverName = receiverName;
    }

    public String getDllPath() {
        return DllPath;
    }

    public void setDllPath(String dllPath) {
        DllPath = dllPath;
    }

    public Integer getIsEnabled() {
        return IsEnabled;
    }

    public void setIsEnabled(Integer isEnabled) {
        IsEnabled = isEnabled;
    }

    public String getFilterRule() {
        return FilterRule;
    }

    public void setFilterRule(String filterRule) {
        FilterRule = filterRule;
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
