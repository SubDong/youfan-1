package com.youfan.controllers.server;

import com.youfan.commons.vo.CollectionVO;
import com.youfan.commons.vo.server.OrderVO;
import com.youfan.commons.vo.server.CouponsTypeVO;
import com.youfan.controllers.params.CouponsParams;
import com.youfan.controllers.params.OrderParams;
import com.youfan.controllers.support.Response;
import com.youfan.controllers.support.Responses;
import com.youfan.data.models.CouponsContentEntity;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.data.models.MerchantUserEntity;
import com.youfan.exceptions.UserException;
import com.youfan.services.merchant.MerchantKitchenService;
import com.youfan.services.merchant.MerchantUsersService;
import com.youfan.services.server.CouponsTypeService;
import com.youfan.services.server.OrderService;
import com.youfan.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by MrDeng on 15/8/17.
 */
@RestController
@RequestMapping(path = "/pBusiness")
public class PlatFormBusinessController {

    Logger logger = LoggerFactory.getLogger(PlatFormBusinessController.class);
    @Resource
    MerchantUsersService merchantUsersService;
    @Resource
    MerchantKitchenService merchantKitchenService;
    @Resource
    OrderService orderService;

    @Resource
    CouponsTypeService couponsTypeService;
    ///////////////////////////////// 系统//////////////////////////////////////////

    /**
     * 检查敏感词
     *
     * @param sentence
     * @param request
     * @param response
     * @return
     * @description TODO
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年9月1日 上午9:44:27
     */
    @RequestMapping(method = RequestMethod.GET, path = "/sys/checkWords/{sentence}")
    public Response checkWords(@PathVariable String sentence, HttpServletRequest request, HttpServletResponse response) {
        Response res = null;
        res = Responses.SUCCESS().setCode(1).setMsg("No Sensitive Words");
        return res;
    }

    /**
     * 分页获取订单信息
     *
     * @param request
     * @param response
     * @return
     * @description TODO
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年8月31日 上午10:21:13
     */
    @RequestMapping(method = RequestMethod.GET, path = "/sys/getOrder")
    public Response getOrders(HttpServletRequest request, HttpServletResponse response) {
        OrderParams op = new OrderParams();
        boolean ifPager = false;
        Response res = null;
        try {

            if (request.getParameter("orderNo") != null) {
                op.setOrderNo(request.getParameter("orderNo"));
            }
            if (request.getParameter("buyerId") != null) {
                op.setBuyerId(request.getParameter("buyerId"));
            }
            if (request.getParameter("sellerId") != null) {
                op.setSellerId(request.getParameter("sellerId"));
            }
            if (request.getParameter("orderStatus") != null) {
                op.setOrderStatus(Integer.valueOf(request.getParameter("orderStatus")));
            }

            if (request.getParameter("pageNo") != null && request.getParameter("pageSize") != null
                    && request.getParameter("orderBy") != null) {
                op.setPageSize(Integer.valueOf(request.getParameter("pageSize")));
                op.setPageNo(Integer.valueOf(request.getParameter("pageNo")));
                op.setOrderBy(request.getParameter("orderBy"));
                ifPager = true;
            }
            int recordCnt = orderService.count(op);
            if (ifPager) {
                CollectionVO<OrderVO> payload = new CollectionVO<>(new ArrayList<OrderVO>(), recordCnt, op.getPageSize() < 1 ? recordCnt : op.getPageSize());
                payload = orderService.getOrdersByParams(op);
                res = Responses.SUCCESS().setMsg("数据获取成功").setPayload(payload);
            } else {
                // orderService.ge(op, p)
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
            res = Responses.FAILED().setMsg("数据获取异常");
        }
        return res;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/sys/saveCouponsType")
    public Response saveCouponsType(HttpServletRequest request, HttpServletResponse response) {
        Response res = null;
        try {
            if (request.getParameter("port") != null && request.getParameter("timeLine") != null
                    && request.getParameter("kitchenId") != null) {

                CouponsTypeVO coupons = new CouponsTypeVO();
                coupons.setPort(Integer.valueOf(request.getParameter("port")));
                coupons.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
                coupons.setKitchenId(request.getParameter("kitchenId"));
                coupons.setDesc(request.getParameter("desc"));
                coupons.setContent(JSONUtils.getObjectListByJson(request.getParameter("content"), CouponsContentEntity.class));
                //创建时间为保存时当前时间
                coupons.setCreateTime(new Date().getTime());
                //状态默认为1 表示开启使用状态
                coupons.setStatus(1);
                couponsTypeService.save(coupons);
                res = Responses.SUCCESS().setMsg("数据保存成功");
            } else {
                res = Responses.FAILED().setMsg("数据保存异常:参数错误");
            }
        } catch (Exception e) {
            res = Responses.FAILED().setMsg("数据保存异常：数据库异常");
        }

        return res;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/sys/getCouponsType")
    public Response getCouponsType(HttpServletRequest request, HttpServletResponse response) {
        Response res = null;
        try {
            CouponsParams couponsParams = new CouponsParams();
            if (request.getParameter("port") != null) {
                couponsParams.setPort(Integer.valueOf(request.getParameter("port")));
            }
            if (request.getParameter("timeLine") != null) {
                couponsParams.setTimeLine(Integer.valueOf(request.getParameter("timeLine")));
            }

            if (request.getParameter("kitchenId") != null) {
                couponsParams.setKitchenId(request.getParameter("kitchenId"));
            }
            if (request.getParameter("status") != null) {
                couponsParams.setStatus(Integer.valueOf(request.getParameter("status")));
            }
            long recordCnt = couponsTypeService.count(couponsParams);
            if (request.getParameter("pageSize") != null && request.getParameter("pageNo") != null) {
                couponsParams.setPageSize(Integer.valueOf(request.getParameter("pageSize")));
                couponsParams.setPageNo(Integer.valueOf(request.getParameter("pageNo")));
            } else {
                couponsParams.setPageSize((int) recordCnt);
                couponsParams.setPageNo(0);
            }
            CollectionVO<CouponsTypeVO> payload = new CollectionVO<>(new ArrayList<CouponsTypeVO>(), (int) recordCnt, couponsParams.getPageSize() < 1 ? (int) recordCnt : couponsParams.getPageSize());
            List<CouponsTypeVO> list = couponsTypeService.getByCondition(couponsParams);
            payload.addAll(list);
            res = Responses.SUCCESS().setPayload(payload).setCode(1).setMsg("数据获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res = Responses.SUCCESS().setCode(0).setMsg("数据获取失败");
        }

        return res;
    }
    ///////////////////////////////// 客户//////////////////////////////////////////
    ///////////////////////////////// 商家//////////////////////////////////////////

    /**
     * 获取置顶状态的商家信息
     *
     * @param
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getByStatus")

    public List<MerchantUserEntity> getByStatus(HttpServletRequest request, HttpServletResponse response) {
        try {
            Integer status = 0;
            if (request.getParameter("status") != null) {
                status = Integer.valueOf(request.getParameter("status"));
            }
            return merchantUsersService.getMerchantByStatus(status);
        } catch (UserException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ArrayList<MerchantUserEntity>();
    }

    /**
     * 获取分页 商家信息
     *
     * @param
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getMerchant/{pageNo}/{pageSize}")
    public CollectionVO<MerchantUserEntity> getMerchant(@PathVariable Integer pageNo, @PathVariable Integer pageSize,
                                                        HttpServletRequest request, HttpServletResponse response) {
        CollectionVO<MerchantUserEntity> result = null;
        try {
            Query query = new Query();
            if (request.getParameter("status") != null) {
                query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
            }
            if (request.getParameter("userName") != null) {
                query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
            }

            if (request.getParameter("realName") != null) {
                query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
            }

            long count = merchantUsersService.count(query);
            query.skip((pageNo - 1) * pageSize);
            query.limit(pageSize);
            List<MerchantUserEntity> msa = merchantUsersService.find(query);
            result = new CollectionVO<MerchantUserEntity>(msa, (int) count, pageSize);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    /**
     * 获取分页 商家厨房信息
     *
     * @param
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/getKitchen/{pageNo}/{pageSize}")
    public CollectionVO<MerchantKitchenInfoEntity> getKitchen(@PathVariable Integer pageNo,
                                                              @PathVariable Integer pageSize, HttpServletRequest request, HttpServletResponse response) {
        CollectionVO<MerchantKitchenInfoEntity> result = null;
        try {
            Query query = new Query();
            if (request.getParameter("status") != null) {
                query.addCriteria(Criteria.where("status").is(Integer.valueOf(request.getParameter("status"))));
            }
            if (request.getParameter("userName") != null) {
                query.addCriteria(Criteria.where("userName").is(request.getParameter("userName")));
            }

            if (request.getParameter("realName") != null) {
                query.addCriteria(Criteria.where("realName").is(request.getParameter("realName")));
            }

            long count = merchantUsersService.count(query);
            query.skip((pageNo - 1) * pageSize);
            query.limit(pageSize);
            List<MerchantKitchenInfoEntity> msa = merchantKitchenService.find(query);
            result = new CollectionVO<MerchantKitchenInfoEntity>(msa, (int) count, pageSize);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    /**
     * 商家 审核接口
     *
     * @param request
     * @param response
     * @description TODO
     * @version 1.0
     * @author QinghaiDeng
     * @update 2015年8月26日 下午5:50:28
     */
    @RequestMapping(method = RequestMethod.GET, path = "/merchant/checkMerchant")
    public void checkMerchant(HttpServletRequest request, HttpServletResponse response) {
        Integer status = 0;
        if (request.getParameter("id") != null && request.getParameter("status") != null) {
            status = Integer.valueOf(request.getParameter("status"));
            merchantUsersService.checkMerchant(request.getParameter("id"), status);
        }
    }

}
