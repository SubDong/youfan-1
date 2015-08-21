package com.youfan.data.dao;

import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.youfan.commons.MerchantConstants;
import com.youfan.data.models.DishesEntity;

public interface DishesDAO extends MongoBaseDAO<DishesEntity, String>,
		MerchantConstants {

	List<DishesEntity> list(String merchantId, String dishesType);

	default Query buildQuery(String merchantId, String dishesType,
			boolean isValid) {
		Criteria criteria = Criteria.where(DATA_STATUS).is(isValid ? 1 : 0);

		if (merchantId != null) {
			criteria.and("merchantId").is(merchantId);
		}

		if (dishesType != null) {
			criteria.and("dishesType").is(dishesType);
		}

		return Query.query(criteria);
	}
}
