package com.mycart.admin.brand;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycart.common.dto.BrandDTO;
import com.mycart.common.entity.Brand;
import com.mycart.common.entity.Category;

@RestController
@RequestMapping("/brands")
public class BrandController {

	@Autowired
	BrandRepository brandRepo;
	
	@Autowired
	BrandService service;
	
//	@GetMapping(value = "/")
//	public List<Brand> getAllBrands(){
//		return (List<Brand>) brandRepo.findAll();
//	}
	
	
	//get all the brands
		@GetMapping(value = "/")
		public Map<Object,Object> listFirstPage(){
			
			
			return listByPage(1,"name","asc",null);	
		}
		
		
		//Get users data by pagination and sorting	
		@GetMapping(value = "/page/{pageNum}/sort")
		public Map<Object,Object> listByPage(@PathVariable Integer pageNum,@Param("sortField") String 
				sortField,@Param("sortField") String sortDir,@Param("keyword") String keyword ) {
			
			Page<Brand> pageBrand = service.listByPage(pageNum,sortField,sortDir,keyword); 
			List<Brand> listBrands = pageBrand.getContent();
			
			long startCount = (pageNum - 1)*BrandConstants.BRANDS_PER_PAGE + 1; 
			long endCount = startCount + BrandConstants.BRANDS_PER_PAGE- 1;
			
			if(endCount > pageBrand.getTotalElements()) {
				endCount = pageBrand.getTotalElements();
			}
			
			Map<Object,Object> pageMap = new HashMap<>();
			pageMap.put("startCount", startCount);
			pageMap.put("endCount", endCount);
			pageMap.put("totalItems", pageBrand.getTotalElements());
			pageMap.put("AllBrands", listBrands);

			return pageMap;
		}
		
		
		//Create a new Brand
		@PostMapping(value = "/new")
		public String saveBrand(@RequestBody BrandDTO brand) throws Exception {
			
			
			Integer[] data = brand.getBrands();
			
			Brand newBrand = new Brand(brand.getName(),brand.getImage());
			for(int i = 0 ;i<data.length;i++) {
				if(data[i]!=0) {
					Category category = new Category(data[i]);
					newBrand.addBrand(category);
				}
			
			}
			
			service.save(newBrand);
			
			return "OK";
			
			
		}
		
		
		//get brand data by id
		//get user data by id
		@GetMapping(value="/get_brand/{id}")
		public ResponseEntity<Brand> getBrandById(@PathVariable("id") Integer id) throws BrandNotFoundException {
			ResponseEntity<Brand> response = null;
			try {
			System.out.println("Data");
			Brand brand =  service.get(id);
			response = new ResponseEntity<Brand>(brand, HttpStatus.OK);
			
			}catch(BrandNotFoundException ex) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			
			return response;
		
		}
		
		//edit a brand
		@PostMapping(value = "/edit/{id}")
		public String updateCategory(@RequestBody BrandDTO brand) throws BrandNotFoundException {
			
			
			Integer[] data = brand.getBrands();
			
			try {
				return service.update(brand);
				
			}catch(BrandNotFoundException e) {
				throw e;
			}
			
			
			
			
		}
		
		
		//get all brands
		@GetMapping(value = "/listall")
		public List<Brand> listAll(){
			return service.listAll();
			
		}
		
		
		
		
		
		
		
		//delete a brand with a specific id
		@DeleteMapping(value = "/delete/{id}")
		public String deleteBrand(@PathVariable Integer id) throws BrandNotFoundException {
			service.delete(id);
			return "OK";
		}
		
		
		//Export to Excel
		@GetMapping(value = "/export/excel")
		public void exporTotExcel(HttpServletResponse response) throws IOException {
			List<Brand> listBrands = service.listAll();
			BrandExcelExporter exporter = new BrandExcelExporter();
			exporter.export(listBrands, response);
		}
		
		
		
		
		
		
}
