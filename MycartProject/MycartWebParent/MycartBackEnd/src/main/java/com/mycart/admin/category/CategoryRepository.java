package com.mycart.admin.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.mycart.common.entity.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Integer> {
	
	public Long countById(Integer id);
	
	@Query("SELECT c FROM Category c WHERE c.name LIKE %?1%")
	public Page<Category> search(String keyword,Pageable pageable);

}
