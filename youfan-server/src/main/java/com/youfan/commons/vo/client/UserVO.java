package com.youfan.commons.vo.client;

/**
 * Created by icepros on 15-8-25.
 */
public class UserVO {

    private String id;
    //用户电话 作为 登陆账号
    private String tel;
    //登陆密码
    private String password;
    //昵称
    private String name;
    //性别
    private String sex;
    //年龄
    private String age;
    //职业
    private String jobs;


    public UserVO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getJobs() {
        return jobs;
    }

    public void setJobs(String jobs) {
        this.jobs = jobs;
    }
}
