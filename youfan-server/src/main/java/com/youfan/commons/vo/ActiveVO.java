package com.youfan.commons.vo;

import java.util.List;

import com.youfan.commons.vo.server.CouponDetailVO;

/**
 * 
 * @title ActiveVO.java
 * @package com.youfan.commons.vo
 * @description 活动VO
 * @author QinghaiDeng   
 * @update 2015年9月17日 上午9:34:57
 * @version V1.0  
 * Copyright (c)2012 chantsoft-版权所有
 */
public class ActiveVO {
	private String id;

	/**
	 * 活动状态 -1:删除 0:待开启 1:开启 2:暂定
	 */
	private Integer status;

	/**
	 * 数据状态
	 */
	private Integer dataStatus=1;
	/**
	 * 活动事件
	 */
	private String event;
	/**
	 * 活动标题
	 */
	private String title;
	/**
	 * 活动针对端 目前默认为2 2.客户端 3.商家端
	 */
	private Integer port = 2;

	/**
	 * 活动类型 1.注册完成活动 2.登录后活动 3.订单生成后活动 4.订单完成后活动 5.其他
	 */
	private Integer pointcut;

	/**
	 * 优惠方式 1.发放优惠券 2.价格折扣减免
	 */
	private Integer type;
	/**
	 * 优惠券有效期  在type =1 时表示  发放优惠券的有效期
	 */
	private Long validityTime;
	
	/**
	 * 是否为唯一参加活动 即和别的活动一起参加
	 * 目前默认只能唯一参加
	 */
	private boolean ifUnique=true;

	/**
	 * 是否可以同时使用优惠券 针对减免返现活动 目前默认为不能
	 */
	private boolean ifUseCoupons =false;

	/**
	 * 是否为全场 
	 * 目前默认为全场
	 */
	private boolean ifAll = true;
	/**
	 * 非全场时指定厨房ID
	 */
	private String kitchenId;
	/**
	 * 允许参加次数 目前默认为1 只能参加一次
	 */
	private Integer allowTimes=1;

	/**
	 * 活动创建时间
	 */
	private Long createTime;
	/**
	 * 活动发布日期 UNIX时间 以 00:00:00开始
	 */
	private Long startTime;
	/**
	 * 活动结束日期 UNIX时间 以23:59:59结束
	 */
	private Long endTime;
	
	/**
	 * 活动的用户条件
	 */
	private List<ConditionVO> userConditions;
	/**
	 * 活动的订单条件
	 */
	private List<ConditionVO> orderConditions;
	
	/**
	 * 活动描述
	 */
	private String desc;
	
	
	/**
	 * 优惠方式
	 */
	private String couponType;
	/**
	 * 活动优惠详情
	 */
	private List<CouponDetailVO> couponDetails;


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
	}


	public Integer getDataStatus() {
		return dataStatus;
	}


	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}


	public String getEvent() {
		return event;
	}


	public void setEvent(String event) {
		this.event = event;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Integer getPort() {
		return port;
	}


	public void setPort(Integer port) {
		this.port = port;
	}


	public Integer getPointcut() {
		return pointcut;
	}


	public void setPointcut(Integer pointcut) {
		this.pointcut = pointcut;
	}


	public Integer getType() {
		return type;
	}


	public void setType(Integer type) {
		this.type = type;
	}


	public Long getValidityTime() {
		return validityTime;
	}


	public void setValidityTime(Long validityTime) {
		this.validityTime = validityTime;
	}


	public boolean isIfUnique() {
		return ifUnique;
	}


	public void setIfUnique(boolean ifUnique) {
		this.ifUnique = ifUnique;
	}


	public boolean isIfUseCoupons() {
		return ifUseCoupons;
	}


	public void setIfUseCoupons(boolean ifUseCoupons) {
		this.ifUseCoupons = ifUseCoupons;
	}


	public boolean isIfAll() {
		return ifAll;
	}


	public void setIfAll(boolean ifAll) {
		this.ifAll = ifAll;
	}


	public String getKitchenId() {
		return kitchenId;
	}


	public void setKitchenId(String kitchenId) {
		this.kitchenId = kitchenId;
	}


	public Integer getAllowTimes() {
		return allowTimes;
	}


	public void setAllowTimes(Integer allowTimes) {
		this.allowTimes = allowTimes;
	}


	public Long getCreateTime() {
		return createTime;
	}


	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long getStartTime() {
		return startTime;
	}


	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}


	public Long getEndTime() {
		return endTime;
	}


	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}


	public String getDesc() {
		return desc;
	}


	public void setDesc(String desc) {
		this.desc = desc;
	}


	public List<CouponDetailVO> getCouponDetails() {
		return couponDetails;
	}


	public void setCouponDetails(List<CouponDetailVO> couponDetails) {
		this.couponDetails = couponDetails;
	}


	public List<ConditionVO> getUserConditions() {
		return userConditions;
	}


	public void setUserConditions(List<ConditionVO> userConditions) {
		this.userConditions = userConditions;
	}

	
	

	public String getCouponType() {
		return couponType;
	}


	public void setCouponType(String couponType) {
		this.couponType = couponType;
	}


	public List<ConditionVO> getOrderConditions() {
		return orderConditions;
	}


	public void setOrderConditions(List<ConditionVO> orderConditions) {
		this.orderConditions = orderConditions;
	}


	@Override
	public String toString() {
		return "ActiveVO [id=" + id + ", status=" + status + ", dataStatus=" + dataStatus + ", event=" + event
				+ ", title=" + title + ", port=" + port + ", pointcut=" + pointcut + ", type=" + type
				+ ", validityTime=" + validityTime + ", ifUnique=" + ifUnique + ", ifUseCoupons=" + ifUseCoupons
				+ ", ifAll=" + ifAll + ", kitchenId=" + kitchenId + ", allowTimes=" + allowTimes + ", createTime="
				+ createTime + ", startTime=" + startTime + ", endTime=" + endTime + ", userConditions="
				+ userConditions + ", orderConditions=" + orderConditions + ", desc=" + desc + ", couponDetails="
				+ couponDetails + "]";
	}


	
	
}
