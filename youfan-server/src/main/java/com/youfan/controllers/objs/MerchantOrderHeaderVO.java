package com.youfan.controllers.objs;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * @author TomDing
 */
public class MerchantOrderHeaderVO {

    private String orderNo;
    private Long buyerId;
    private int orderStatus;
    private double price;
    private Timestamp repastTime;
    private String repastAddress;
    /**
     * 购买者头像
     */
    private String img;
    /**
     * 菜单ID集合逗号分隔
     */
    private String dishesId;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Timestamp getRepastTime() {
        return repastTime;
    }

    public void setRepastTime(Timestamp repastTime) {
        this.repastTime = repastTime;
    }

    public String getRepastAddress() {
        return repastAddress;
    }

    public void setRepastAddress(String repastAddress) {
        this.repastAddress = repastAddress;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDishesId() {
        return dishesId;
    }

    public void setDishesId(String dishesId) {
        this.dishesId = dishesId;
    }

    public List<Long> longDishesId() {
        List<Long> menuIds = new ArrayList<Long>();
        String[] ids = dishesId.split(",");

        if (ids != null) {
            for (String id : ids) {
                menuIds.add(Long.valueOf(id));
            }
        }

        return menuIds;
    }
}
