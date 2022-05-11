package com.mycart.admin.brand;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycart.common.dto.BrandDTO;
import com.mycart.common.entity.Brand;
import com.mycart.common.entity.Category;

@Transactional
@Service
public class BrandService {

	
	@Autowired
	BrandRepository brandRepo;
	
	
	
	
	@Autowired
    private Environment env;
	
	public List<Brand> listAll(){
		return (List<Brand>) brandRepo.findAll();
		
	}
	
	
	
	
	
	public Page<Brand> listByPage(int pageNum,String sortField,String sortDir,String keyword){
		
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc")?sort.ascending():sort.descending();
		Pageable pageable = PageRequest.of(pageNum-1, BrandConstants.BRANDS_PER_PAGE,sort);
		
		if(keyword.length()>0) {
			System.out.println("im here");
			return brandRepo.search(keyword,pageable);
		}
		
		return brandRepo.findAll(pageable);
		
	}
	
	
	
	public void save(Brand brand) {
		
		brandRepo.save(brand);
		}
	
	
	
	//get a brand with a specific id
		public Brand get(Integer id) throws BrandNotFoundException {
			
			return brandRepo.findById(id).get();
			
		}
		
		
		
		//delete an brand with a specific id
		public void delete(Integer id) throws BrandNotFoundException {
			Long countById = brandRepo.countById(id);
			if(countById== null || countById == 0) {
				throw new BrandNotFoundException("No user found with the id "+id);
			}
			
			brandRepo.deleteById(id);
		}
		
		
		public String update(BrandDTO brand ) throws BrandNotFoundException {
			Integer[] data = brand.getBrands();
			Brand editBrand = get(brand.getId());
			editBrand.setName(brand.getName());
			editBrand.setImage(brand.getImage());
			editBrand.setCategories(new HashSet<>());
			 for(int i = 0;i<data.length;i++) {
				 Category category = new Category(data[i]);
				 editBrand.addBrand(category);
			 }
			 
			 brandRepo.save(editBrand);
			 
			 return "OK";
		}
	
	
	
}
