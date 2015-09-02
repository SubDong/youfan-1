package com.youfan.data.dao.client;

import com.youfan.commons.vo.client.UserVO;
import com.youfan.data.dao.MongoBaseDAO;
import com.youfan.data.models.ClientUserEntity;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

/**
 * Created by icepros on 15-8-25.
 */
public interface UserDao extends MongoBaseDAO<ClientUserEntity, UserVO, String> {

    /**
     * 通过电话号码和密码获取用户信息
     * @param tel
     * @param pwd
     * @return
     */
    UserVO getUserByTelAndPwd(String tel, String pwd);

    //更新密码
    UserVO updateUserPwd(String pwd);

    /**
     * 通过电话获取用户
     * @param tel
     * @return
     */
    UserVO getUserByTel(String tel);

   //根据用于ID查询用户
    UserVO findByid(String id);


    @Override
    default Class<ClientUserEntity> getEntityClass() {
        return ClientUserEntity.class;
    }

    @Override
    default Class<UserVO> getVOClass() {
        return UserVO.class;
    }


    default Query buildQuery(String tel, String password) {
        Criteria criteria = Criteria.where("tel").is(tel);

        if (tel != null) {
            criteria.and("password").is(password);
        }

        return Query.query(criteria);
    }

    default Query buildQueryByTel(String tel){
        Criteria criteria = Criteria.where("tel").is(tel);
        return Query.query(criteria);
    }
}
