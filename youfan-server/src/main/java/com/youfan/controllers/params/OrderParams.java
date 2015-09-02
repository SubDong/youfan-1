package com.youfan.controllers.params;

import com.youfan.commons.Pagination;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderParams extends Pagination {

    String orderNo;

    String buyerId;

    String sellerId;

    /**
     * KEY: 菜品ID
     * VALUE[0]: 订购的菜品份数
     * VALUE[1]: 菜品今日余量
     */
    Map<String, Integer[]> itemMap = new HashMap<>();

    String comments;

    double price;

    int orderStatus;

    String repastMode;

    String repastAddress;

    private String couponId;


    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public Map<String, Integer[]> getItemMap() {
        return itemMap;
    }

    public void setItemMap(Map<String, Integer[]> itemMap) {
        this.itemMap = itemMap;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getRepastMode() {
        return repastMode;
    }

    public void setRepastMode(String repastMode) {
        this.repastMode = repastMode;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getRepastAddress() {
        return repastAddress;
    }

    public void setRepastAddress(String repastAddress) {
        this.repastAddress = repastAddress;
    }

    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }
}
