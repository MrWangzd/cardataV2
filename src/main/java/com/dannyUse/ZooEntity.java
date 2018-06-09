package com.dannyUse;

import com.dannyUse.CatEntity;
import com.dannyUse.DogEntity;

public class ZooEntity {
    private CatEntity catEntity;
    private DogEntity dogEntity;

    public CatEntity getCatEntity() {
        return catEntity;
    }

    public void setCatEntity(CatEntity catEntity) {
        this.catEntity = catEntity;
    }

    public DogEntity getDogEntity() {
        return dogEntity;
    }

    public void setDogEntity(DogEntity dogEntity) {
        this.dogEntity = dogEntity;
    }
}
