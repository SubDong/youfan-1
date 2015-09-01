package com.youfan.controllers.params;

import java.util.HashMap;
import java.util.Map;

import com.youfan.commons.Pagination;

/**
 * Created by yousheng on 15/8/14.
 */
public class OrderParams extends Pagination{

	String orderNo;
	
	String buyerId;

	Long sellerId;

	Map<String, Integer> itemMap = new HashMap<>();

	String comments;

	double price;

	Integer orderStatus;

	String repastMode;
    
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

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public Map<String, Integer> getItemMap() {
		return itemMap;
	}

	public void setItemMap(Map<String, Integer> itemMap) {
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

	public Integer getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getRepastMode() {
		return repastMode;
	}

	public void setRepastMode(String repastMode) {
		this.repastMode = repastMode;
	}
}
