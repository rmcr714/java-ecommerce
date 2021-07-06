package com.mycart.admin.user;

import org.springframework.data.repository.CrudRepository;

import com.mycart.common.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Integer> {

}
