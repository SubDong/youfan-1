package com.youfan.services.server.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.youfan.commons.vo.ActiveVO;
import com.youfan.controllers.params.ActiveParams;
import com.youfan.data.dao.server.ActiveDAO;
import com.youfan.services.server.ActiveService;

@Service("activeService")
public class ActiveServiceImpl implements ActiveService{

	@Resource
	ActiveDAO activeDAO;
	
	@Override
	public void save(ActiveVO activeVo) {
		// TODO Auto-generated method stub
		activeDAO.insert(activeVo);
	}

	@Override
	public long count(ActiveParams activeParams) {
		// TODO Auto-generated method stub
		return activeDAO.count(activeParams) ;
	}

	@Override
	public List<ActiveVO> getByCondition(ActiveParams activeParams) {
		// TODO Auto-generated method stub
		return activeDAO.getByCondition(activeParams);
	}

	@Override
	public void updateById(String id, Map<String, Object> updateMap) {
		// TODO Auto-generated method stub
		activeDAO.updateById(id,updateMap);
	}

}
