package com.yiche.Entity;

import java.util.Date;

public class EmailLogReceiverEntity {
    private Integer Id;
    private String Name;
    private Integer IsEnabled;
    private String ReceiverCompany;
    private Integer LogCategory;
    private String Description;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Integer getIsEnabled() {
        return IsEnabled;
    }

    public void setIsEnabled(Integer isEnabled) {
        IsEnabled = isEnabled;
    }

    public String getReceiverCompany() {
        return ReceiverCompany;
    }

    public void setReceiverCompany(String receiverCompany) {
        ReceiverCompany = receiverCompany;
    }

    public Integer getLogCategory() {
        return LogCategory;
    }

    public void setLogCategory(Integer logCategory) {
        LogCategory = logCategory;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
