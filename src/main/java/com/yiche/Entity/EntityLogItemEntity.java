package com.yiche.Entity;

import java.util.Date;

public class EntityLogItemEntity {
    private Integer Id;
    private Date LogTime;
    private String UserName;
    private Integer EntityType;
    private Integer EntityId;
    private Integer OperateType;
    private String Memo;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Date getLogTime() {
        return LogTime;
    }

    public void setLogTime(Date logTime) {
        LogTime = logTime;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public Integer getEntityType() {
        return EntityType;
    }

    public void setEntityType(Integer entityType) {
        EntityType = entityType;
    }

    public Integer getEntityId() {
        return EntityId;
    }

    public void setEntityId(Integer entityId) {
        EntityId = entityId;
    }

    public Integer getOperateType() {
        return OperateType;
    }

    public void setOperateType(Integer operateType) {
        OperateType = operateType;
    }

    public String getMemo() {
        return Memo;
    }

    public void setMemo(String memo) {
        Memo = memo;
    }
}
