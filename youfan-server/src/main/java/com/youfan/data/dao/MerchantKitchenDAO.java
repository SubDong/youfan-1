package com.youfan.data.dao;

import com.youfan.controllers.objs.MerchantKitchenInfo;
import com.youfan.data.models.MerchantKitchenInfoEntity;
import com.youfan.exceptions.KitchenInfoException;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

/**
 * Created by perfection on 15-8-25.
 */
public interface MerchantKitchenDAO extends MongoBaseDAO<MerchantKitchenInfoEntity, MerchantKitchenInfo, Long> {
    MerchantKitchenInfo saveMerchantKitchenInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenPicInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    MerchantKitchenInfo saveMerchantKitchenStoryInfo(MerchantKitchenInfo merchantKitchenInfo) throws KitchenInfoException;

    List<MerchantKitchenInfo> pageList(Integer page, Integer pageSize) throws KitchenInfoException;

	long count(Query query);

	List<MerchantKitchenInfoEntity> find(Query query);
    MerchantKitchenInfo findById(String id);
}
