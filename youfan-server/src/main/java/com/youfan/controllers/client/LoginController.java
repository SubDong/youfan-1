package com.youfan.controllers.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youfan.commons.vo.client.UserVO;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.exceptions.UserException;
import com.youfan.services.client.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by yousheng on 15/8/14.
 */
@RestController
@RequestMapping("/client")
public class LoginController {

    @Resource
    private UserService ucService;
    Logger logger = LoggerFactory.getLogger(LoginController.class);

    /**
     * 用户注册
     *
     * @param uc
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, path = "/register", produces = "application/json")
    public void register(@RequestBody UserVO uc) {

        UserVO userVO = new UserVO();

        String tel = uc.getTel();

        userVO.setTel(tel);
        userVO.setPassword(uc.getPassword());
        userVO.setName("优饭" + tel.substring(tel.length() - 4, tel.length()));
        userVO.setSex("待完善");
        userVO.setAge("待完善");
        userVO.setJobs("待完善");

        ucService.insert(userVO);
    }

    /**
     * 用户登陆
     */
    @RequestMapping(method = RequestMethod.POST, path = "/login", produces = "application/json")
    public Response login(@RequestBody UserVO ucVO) {

        Response response = null;
        UserVO userClientVO = new UserVO();
        try {
            userClientVO = ucService.findUserByTelAndPwd(ucVO.getTel(), ucVO.getPassword());
            response = Responses.SUCCESS().setPayload(userClientVO);
        } catch (Exception e) {
            response = Responses.FAILED();
            logger.error(e.getMessage());
        }
        return response;
    }
}
