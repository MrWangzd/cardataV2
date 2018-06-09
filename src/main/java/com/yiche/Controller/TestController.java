package com.yiche.Controller;

import com.dannyUse.PerFactory;
import com.dannyUse.Person;
import com.dannyUse.PersonOne;
import com.yiche.GirlProperties;
import com.dannyUse.Student;
import com.dannyUse.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class TestController {
/*
    @Value("${cupSize}")
    private String cupSize;

    @Value("${age}")
    private Integer age;

    @Value("${content}")
    private String content;*/

    @Autowired
    private GirlProperties girlProperties;

    @RequestMapping(value = "/login/{id}",method = RequestMethod.GET)
    public String login(@PathVariable("id") Integer id) {
        //return girlProperties.getCupSize();
        return "id"+id;
    }

    @RequestMapping(value = "/getcars",method = RequestMethod.GET)
    public String getCars(){
        Teacher t = Student.class.getAnnotation(Teacher.class);
        return t.value();
    }

    @RequestMapping(value="/getStyles",method = RequestMethod.GET)
    public String getStyles(){
        Person person = new Person();
        PersonOne personOne = new PersonOne();

        PerFactory personFactory = new PerFactory();
        personFactory.setPerson(person);
        return personFactory.OutResult();
    }
    //@Autowired
    //CatEntity catEntity;

    @RequestMapping(value="/getZoo",method = RequestMethod.GET)
    public String getZoo(){

        //CatEntity catEntity = new CatEntity();
        //catEntity.setAge(11);
        //catEntity.setName("haha");

        /*DogEntity dogEntity = new DogEntity();
        dogEntity.setAge(12);
        dogEntity.setName("haha1");
        ZooEntity zooEntity = new ZooEntity();
        zooEntity.setCatEntity(catEntity);
        zooEntity.setDogEntity(dogEntity);
        return zooEntity.getCatEntity().getName();*/
        return "haha";
    }
}
