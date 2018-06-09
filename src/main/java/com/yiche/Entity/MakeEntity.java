package com.yiche.Entity;

import java.util.Date;

public class MakeEntity {
    private Integer Id;
    private Integer CountryId;
    private Integer MasterBrandId;
    private Integer ManufacturerId;
    private String Name;
    private String OtherName;
    private String EnglishName;
    private String Phone;
    private String WebSite;
    private String Introduction;
    private String Logo;
    private String Spell;
    private Integer IsEnabled;
    private Integer IsRemoved;
    private Date UpdateTime;
    private Date CreateTime;
    private String SeoName;
    private String Weight;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getCountryId() {
        return CountryId;
    }

    public void setCountryId(Integer countryId) {
        CountryId = countryId;
    }

    public Integer getMasterBrandId() {
        return MasterBrandId;
    }

    public void setMasterBrandId(Integer masterBrandId) {
        MasterBrandId = masterBrandId;
    }

    public Integer getManufacturerId() {
        return ManufacturerId;
    }

    public void setManufacturerId(Integer manufacturerId) {
        ManufacturerId = manufacturerId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getOtherName() {
        return OtherName;
    }

    public void setOtherName(String otherName) {
        OtherName = otherName;
    }

    public String getEnglishName() {
        return EnglishName;
    }

    public void setEnglishName(String englishName) {
        EnglishName = englishName;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getWebSite() {
        return WebSite;
    }

    public void setWebSite(String webSite) {
        WebSite = webSite;
    }

    public String getIntroduction() {
        return Introduction;
    }

    public void setIntroduction(String introduction) {
        Introduction = introduction;
    }

    public String getLogo() {
        return Logo;
    }

    public void setLogo(String logo) {
        Logo = logo;
    }

    public String getSpell() {
        return Spell;
    }

    public void setSpell(String spell) {
        Spell = spell;
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

    public String getSeoName() {
        return SeoName;
    }

    public void setSeoName(String seoName) {
        SeoName = seoName;
    }

    public String getWeight() {
        return Weight;
    }

    public void setWeight(String weight) {
        Weight = weight;
    }
}
