package com.yiche.Entity.MabDic;

import java.util.Date;

public class MasterBrandEntity {
    private Integer Id;
    private String Name;
    private String OtherName;
    private String EnglishName;
    private Integer CountryId;
    private String LogoUrl;
    private String LogoMeaning;
    private String Spell;
    private String Introduction;
    private Integer IsEnabled;
    private Integer IsRemoved;
    private Date UpdateTime;
    private Date CreateTime;
    private String SeoName;
    private String Remarks;
    private String Weight;
    private Integer KeyBrand;
    private Integer GrandBrand;
    private Integer BrandType;

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

    public Integer getCountryId() {
        return CountryId;
    }

    public void setCountryId(Integer countryId) {
        CountryId = countryId;
    }

    public String getLogoUrl() {
        return LogoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        LogoUrl = logoUrl;
    }

    public String getLogoMeaning() {
        return LogoMeaning;
    }

    public void setLogoMeaning(String logoMeaning) {
        LogoMeaning = logoMeaning;
    }

    public String getSpell() {
        return Spell;
    }

    public void setSpell(String spell) {
        Spell = spell;
    }

    public String getIntroduction() {
        return Introduction;
    }

    public void setIntroduction(String introduction) {
        Introduction = introduction;
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

    public String getRemarks() {
        return Remarks;
    }

    public void setRemarks(String remarks) {
        Remarks = remarks;
    }

    public String getWeight() {
        return Weight;
    }

    public void setWeight(String weight) {
        Weight = weight;
    }

    public Integer getKeyBrand() {
        return KeyBrand;
    }

    public void setKeyBrand(Integer keyBrand) {
        KeyBrand = keyBrand;
    }

    public Integer getGrandBrand() {
        return GrandBrand;
    }

    public void setGrandBrand(Integer grandBrand) {
        GrandBrand = grandBrand;
    }

    public Integer getBrandType() {
        return BrandType;
    }

    public void setBrandType(Integer brandType) {
        BrandType = brandType;
    }
}
