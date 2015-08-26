package com.youfan.data.models;


import static com.youfan.commons.Constants.COLLECTION_MESSAGE;

import java.net.URLEncoder;
import java.util.Date;

import org.apache.commons.codec.net.URLCodec;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.youfan.utils.CipherUtil;
import com.youfan.utils.ConfigUtil;
import com.youfan.utils.HttpClientUtil;
@Document(collection = COLLECTION_MESSAGE)
public class MessageEntity {
	
	
	@Id
	private String id;
	
	private Integer status;//0 未读 ，1已读  2，删除

	private Long receiverId;
	
	private Integer receiverPort;// 2用户端， 3商家端 
	
	private String data;
	
	private Long date;
	
	private Integer code;
	
	public MessageEntity() {
		super();
	}
	
	public MessageEntity(Integer status, Long receiverId, Integer receiverPort, String data,Integer code) {
		super();
		this.status = status;
		this.receiverId = receiverId;
		this.receiverPort = receiverPort;
		this.data = data;
		//this.id = CipherUtil.getUUID();
		this.date = new Date().getTime();
		this.code = code;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getReceiverPort() {
		return receiverPort;
	}

	public void setReceiverPort(Integer receiverPort) {
		this.receiverPort = receiverPort;
	}

	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Long getReceiverId() {
		return receiverId;
	}
	public void setReceiverId(Long receiverId) {
		this.receiverId = receiverId;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public Long getDate() {
		return date;
	}
	
	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public int sendMsg() {
		HttpClientUtil h = new HttpClientUtil();
		int result = 0;
		 try {
			 h.open(ConfigUtil.getString("serverUrl"),"get");
			 h.addParameter("toId", receiverId.toString());
			 h.addParameter("toPort", receiverPort.toString());
			 h.addParameter("status", status.toString());
			 h.addParameter("data", URLEncoder.encode(data, "utf-8"));
			 h.addParameter("date",date.toString());
			 h.addParameter("code",code.toString());
			 h.setRequestHeader("Cookie", "Language=zh_CN;UserAgent=PC");
			 result = h.send();
			 h.getResponseBodyAsString("utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			h.close();
		}
		
		return result;
	}

	

	

}
