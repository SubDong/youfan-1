package com.youfan.services.client.impl;

import com.mongodb.WriteResult;
import com.youfan.commons.vo.client.MessageVO;
import com.youfan.data.dao.server.MessageDAO;
import com.youfan.services.client.MessageService;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("messageService")
public class MessageServiceImpl implements MessageService {

    @Resource
    private MessageDAO messageDAO;

    @Override
    public void insert(MessageVO message) {
        if (message == null)
            return;

        messageDAO.insert(message);

    }


    @Override
    public boolean updateMsg(String id, int status) {

        MessageVO message = new MessageVO();
        message.setId(id);
        message.setStatus(status);
        boolean result = messageDAO.updateMsg(message);
        return result;
    }


    @Override
    public MessageVO findById(String id) {
        return messageDAO.findById(id);
    }


    @Override
    public List<MessageVO> findMsgList(String userId, Integer receiver) {
        return messageDAO.getMsgList(userId, receiver);
    }

    @Override
    public Long countUnreadMsg(String userId, Integer receiver) {
        return messageDAO.countUnreadMsg(userId, receiver);
    }

    @Override
    public void delMsg(String id) {
        messageDAO.delete(id);
    }


}
