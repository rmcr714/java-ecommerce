package com.mycart.admin.user;

import org.springframework.data.repository.CrudRepository;

import com.mycart.common.entity.User;

public interface UserRepository extends CrudRepository<User,Integer>{

}
