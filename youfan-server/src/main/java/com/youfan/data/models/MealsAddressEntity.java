package com.youfan.data.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import static com.youfan.commons.Constants.COLLECTION_CLIENT_USER;

/**
 * Created by icepros on 15-9-14.
 */
@Document(collection = COLLECTION_CLIENT_USER)
public class MealsAddressEntity {
    @Id
    private String id;
    //联系人
    private String contact;
    //手机号码
    private String tel;
    //地址
    private String address;
    //楼号门牌号
    private String houseNumber;
    //标签 家or公司
    private String label;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
