package com.mycart.admin.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.mycart.common.entity.User;

public interface UserRepository extends PagingAndSortingRepository<User,Integer>{
	
	@Query("SELECT u FROM User u WHERE u.email=:email")
	public User getUserByEmail(@Param("email") String email);
	
	
	public Long countById(Integer id);

}
