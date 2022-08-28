package com.mycart.admin.product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycart.admin.user.UserConstants;
import com.mycart.common.entity.Product;
import com.mycart.common.entity.User;


@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService service;
	
	
	
	
	   //get all the users
		@GetMapping(value = "/")
		public Map<Object,Object> listFirstPage(){
			
			
			return listByPage(1,"name","asc",null);	
		}
		
		
		//Get users data by pagination and sorting	
		@GetMapping(value = "/page/{pageNum}/sort")
		public Map<Object,Object> listByPage(@PathVariable Integer pageNum,@Param("sortField") String 
				sortField,@Param("sortField") String sortDir,@Param("keyword") String keyword ) {
			
			Page<Product> pageProduct = service.listByPage(pageNum,sortField,sortDir,keyword); 
			List<Product> listProducts = pageProduct.getContent();
			
			long startCount = (pageNum - 1)*ProductConstants.PRODUCTS_PER_PAGE + 1; 
			long endCount = startCount + ProductConstants.PRODUCTS_PER_PAGE - 1;
			
			if(endCount > pageProduct.getTotalElements()) {
				endCount = pageProduct.getTotalElements();
			}
			
			Map<Object,Object> pageMap = new HashMap<>();
			pageMap.put("startCount", startCount);
			pageMap.put("endCount", endCount);
			pageMap.put("totalItems", pageProduct.getTotalElements());
			pageMap.put("AllProducts", listProducts);

			return pageMap;
		}
		
		
		
		
		
		
}
