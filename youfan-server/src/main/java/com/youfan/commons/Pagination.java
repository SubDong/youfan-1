package com.youfan.commons;

/**
 * Created by yousheng on 15/8/18.
 */
public class Pagination {

    private int pageSize;

    private int pageNo;

    private int skip;

    private String orderBy;

    private boolean asc;

    public int getStart() {
        return pageSize * pageNo + 1;
    }


    public int getEnd() {
        return pageSize * (pageNo + 1);
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getAsc() {
        return (asc) ? "ASC" : "DESC";
    }

    public void setAsc(boolean asc) {
        this.asc = asc;
    }
}
