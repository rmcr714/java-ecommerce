package com.mycart.admin.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycart.common.entity.Product;

@Transactional
@Service
public class ProductService {

	
	@Autowired
	ProductRepository productRepo;
	
	
	
	public List<Product> listAll(){
		return (List<Product>) productRepo.findAll();
		
	}
	
	public Page<Product> listByPage(int pageNum,String sortField,String sortDir,String keyword){
	
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc")?sort.ascending():sort.descending();
		Pageable pageable = PageRequest.of(pageNum-1,ProductConstants.PRODUCTS_PER_PAGE,sort);
		
//		if(keyword.length()>0) {
//			System.out.println("im here");
//			return productRepo.findAll(keyword,pageable);
//		}
		
		return productRepo.findAll(pageable);
		
	}
	
	
	
	
}
