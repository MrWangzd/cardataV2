package com.yiche.Entity.MabDic;

public class MabTreeEntity {
    private Integer Id;
    private String Name;
    private String Spell;
    private String AllSpell;
    private Integer Weight;
    private Integer KeyBrand;
    private Boolean IsEnabled;
    private Boolean IsStopProduction;

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

    public String getSpell() {
        return Spell;
    }

    public void setSpell(String spell) {
        Spell = spell;
    }

    public String getAllSpell() {
        return AllSpell;
    }

    public void setAllSpell(String allSpell) {
        AllSpell = allSpell;
    }

    public Integer getWeight() {
        return Weight;
    }

    public void setWeight(Integer weight) {
        Weight = weight;
    }

    public Integer getKeyBrand() {
        return KeyBrand;
    }

    public void setKeyBrand(Integer keyBrand) {
        KeyBrand = keyBrand;
    }

    public Boolean getEnabled() {
        return IsEnabled;
    }

    public void setEnabled(Boolean enabled) {
        IsEnabled = enabled;
    }

    public Boolean getStopProduction() {
        return IsStopProduction;
    }

    public void setStopProduction(Boolean stopProduction) {
        IsStopProduction = stopProduction;
    }
}
