package com.youfan.controllers.params.merchant;

import com.youfan.controllers.params.MongoParams;

public class KitchenParams extends MongoParams {
	private String kitchenName; // 厨房名称
	private String phoneNumber; // 手机号码
	public String getKitchenName() {
		return kitchenName;
	}
	public void setKitchenName(String kitchenName) {
		this.kitchenName = kitchenName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	
}
