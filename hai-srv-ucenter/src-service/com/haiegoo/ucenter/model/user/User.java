package com.haiegoo.ucenter.model.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

public class User implements UserDetails, Serializable, Cloneable {

	private static final long serialVersionUID = 972727446639897872L;

	/**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.user_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Long userId;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.username
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String username;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.password
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String password;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.nicename
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String nicename;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.email
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String email;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.mobile
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String mobile;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.telephone
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String telephone;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.sex
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Byte sex;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.birthday
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Date birthday;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.pay_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Integer payPoints;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.rank_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Integer rankPoints;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.user_rank_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Integer userRankId;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.address_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Integer addressId;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.reg_time
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Date regTime;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.last_login_ip
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String lastLoginIp;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.visit_count
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Long visitCount;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.is_subscribe
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Byte isSubscribe;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.state
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private Byte state;

    /**
     * This field was generated by Apache iBATIS ibator.
     * This field corresponds to the database column user.slave_database
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    private String slaveDatabase;

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.user_id
     *
     * @return the value of user.user_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.user_id
     *
     * @param userId the value for user.user_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.username
     *
     * @return the value of user.username
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getUsername() {
        return username;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.username
     *
     * @param username the value for user.username
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.password
     *
     * @return the value of user.password
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getPassword() {
        return password;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.password
     *
     * @param password the value for user.password
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.nicename
     *
     * @return the value of user.nicename
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getNicename() {
        return nicename;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.nicename
     *
     * @param nicename the value for user.nicename
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setNicename(String nicename) {
        this.nicename = nicename;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.email
     *
     * @return the value of user.email
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getEmail() {
        return email;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.email
     *
     * @param email the value for user.email
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.mobile
     *
     * @return the value of user.mobile
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.mobile
     *
     * @param mobile the value for user.mobile
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.telephone
     *
     * @return the value of user.telephone
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getTelephone() {
        return telephone;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.telephone
     *
     * @param telephone the value for user.telephone
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.sex
     *
     * @return the value of user.sex
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Byte getSex() {
        return sex;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.sex
     *
     * @param sex the value for user.sex
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setSex(Byte sex) {
        this.sex = sex;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.birthday
     *
     * @return the value of user.birthday
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Date getBirthday() {
        return birthday;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.birthday
     *
     * @param birthday the value for user.birthday
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.pay_points
     *
     * @return the value of user.pay_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Integer getPayPoints() {
        return payPoints;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.pay_points
     *
     * @param payPoints the value for user.pay_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setPayPoints(Integer payPoints) {
        this.payPoints = payPoints;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.rank_points
     *
     * @return the value of user.rank_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Integer getRankPoints() {
        return rankPoints;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.rank_points
     *
     * @param rankPoints the value for user.rank_points
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setRankPoints(Integer rankPoints) {
        this.rankPoints = rankPoints;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.user_rank_id
     *
     * @return the value of user.user_rank_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Integer getUserRankId() {
        return userRankId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.user_rank_id
     *
     * @param userRankId the value for user.user_rank_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setUserRankId(Integer userRankId) {
        this.userRankId = userRankId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.address_id
     *
     * @return the value of user.address_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Integer getAddressId() {
        return addressId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.address_id
     *
     * @param addressId the value for user.address_id
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.reg_time
     *
     * @return the value of user.reg_time
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Date getRegTime() {
        return regTime;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.reg_time
     *
     * @param regTime the value for user.reg_time
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setRegTime(Date regTime) {
        this.regTime = regTime;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.last_login_ip
     *
     * @return the value of user.last_login_ip
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getLastLoginIp() {
        return lastLoginIp;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.last_login_ip
     *
     * @param lastLoginIp the value for user.last_login_ip
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.visit_count
     *
     * @return the value of user.visit_count
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Long getVisitCount() {
        return visitCount;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.visit_count
     *
     * @param visitCount the value for user.visit_count
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setVisitCount(Long visitCount) {
        this.visitCount = visitCount;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.is_subscribe
     *
     * @return the value of user.is_subscribe
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Byte getIsSubscribe() {
        return isSubscribe;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.is_subscribe
     *
     * @param isSubscribe the value for user.is_subscribe
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setIsSubscribe(Byte isSubscribe) {
        this.isSubscribe = isSubscribe;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.state
     *
     * @return the value of user.state
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public Byte getState() {
        return state;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.state
     *
     * @param state the value for user.state
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setState(Byte state) {
        this.state = state;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method returns the value of the database column user.slave_database
     *
     * @return the value of user.slave_database
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public String getSlaveDatabase() {
        return slaveDatabase;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method sets the value of the database column user.slave_database
     *
     * @param slaveDatabase the value for user.slave_database
     *
     * @ibatorgenerated Wed Jun 05 15:21:39 CST 2013
     */
    public void setSlaveDatabase(String slaveDatabase) {
        this.slaveDatabase = slaveDatabase;
    }



	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
		auths.add(new SimpleGrantedAuthority("ROLE_USER"));				
		return auths;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		if(this.state>0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
     * @return 创建并返回此对象的一个副本。
     * @throws CloneNotSupportedException
     */
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}