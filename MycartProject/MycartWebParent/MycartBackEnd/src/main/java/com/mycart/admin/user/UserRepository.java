package com.mycart.admin.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.mycart.common.entity.User;

public interface UserRepository extends PagingAndSortingRepository<User,Integer>{
	
	@Query("SELECT u FROM User u WHERE u.email=:email")
	public User getUserByEmail(@Param("email") String email);
	
	@Query("SELECT u  FROM User u WHERE CONCAT(u.id,' ' , u.email,' ',u.firstName,' ',u.lastName) LIKE %?1%")
	public Page<User> findAll(String keyword,Pageable pageable);
	
	
	public Long countById(Integer id);

}
