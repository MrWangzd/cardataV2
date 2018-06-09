package com.dannyUse;

import com.dannyUse.Iperson;

public class PerFactory {

    private Iperson iperson;

    public void setPerson(Iperson iperson){
        this.iperson = iperson;
    }

    public String OutResult(){
        return iperson.say();
    }
}
