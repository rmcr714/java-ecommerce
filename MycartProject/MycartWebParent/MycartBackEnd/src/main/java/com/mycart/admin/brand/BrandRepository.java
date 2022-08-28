package com.mycart.admin.brand;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.mycart.common.entity.Brand;

public interface BrandRepository extends PagingAndSortingRepository<Brand, Integer> {

  public 	Long countById(Integer id);
  
  @Query("SELECT b FROM Brand b WHERE b.name LIKE %?1%")
  public Page<Brand> search(String keyword,Pageable pageable);
  
  @Query("SELECT NEW Brand(b.id,b.name) FROM Brand b ORDER BY b.name ASC")
  public List<Brand> findAll();

}
