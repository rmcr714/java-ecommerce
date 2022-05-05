package com.mycart.admin.category;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycart.admin.user.UserNotFoundException;
import com.mycart.common.dto.CategoryDTO;
import com.mycart.common.entity.Category;
@Transactional
@Service
public class CategoryService {
	
	
	
	
	@Autowired
	CategoryRepository categoryRepo;
	
	
	
	public List<Category> listAll(){
		
		 return (List<Category>) categoryRepo.findAll();

		
	}
	
	public Page<Category> listByPage(int pageNum,String sortField,String sortDir,String keyword){
	
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc")?sort.ascending():sort.descending();
		Pageable pageable = PageRequest.of(pageNum-1, CategoryConstants.CATEGORIES_PER_PAGE,sort);
		
		if(keyword.length()>0) {
			System.out.println("im here");
			return categoryRepo.search(keyword,pageable);
		}
		
		return categoryRepo.findAll(pageable);
		
	}
	
	
	
	
	
	public List<Category> listCategoriesInHierarchicalForm(List<Category> categoriesInDb){
        List<Category> categoriesUsedInForm = new ArrayList<>();
		
		for(Category category:categoriesInDb) {
			if(category.getParent() == null) {
				Category tempCategory = new Category(category.getName());
				tempCategory.setId(category.getId());
				tempCategory.setAlias(category.getAlias());
				tempCategory.setImage(category.getImage());
				tempCategory.setEnabled(category.isEnabled());
				categoriesUsedInForm.add(tempCategory);
				Set<Category> children = category.getChildren();
				for(Category subCategory:children) {
					String name = "--"+subCategory.getName();
					Category tempCategory1 = new Category(name);
					tempCategory1.setId(subCategory.getId());
					tempCategory1.setAlias(subCategory.getAlias());
					tempCategory1.setImage(subCategory.getImage());
					tempCategory1.setEnabled(subCategory.isEnabled());
					categoriesUsedInForm.add(tempCategory1);
					
					listChildren(subCategory,1,categoriesUsedInForm);
				}
			}
		}
		return categoriesUsedInForm;
	}
	
	
	
	
	public List<Category> listCategoriesUsedInForm(){
		
		List<Category> categoriesUsedInForm = new ArrayList<>();
		
		Iterable<Category> categoriesInDb  = categoryRepo.findAll();
		for(Category category:categoriesInDb) {
			if(category.getParent() == null) {
				Category tempCategory = new Category(category.getName());
				tempCategory.setId(category.getId());
				categoriesUsedInForm.add(tempCategory);
				Set<Category> children = category.getChildren();
				for(Category subCategory:children) {
					String name = "--"+subCategory.getName();
					Category tempCategory1 = new Category(name);
					tempCategory1.setId(subCategory.getId());
					categoriesUsedInForm.add(tempCategory1);
					
					listChildren(subCategory,1,categoriesUsedInForm);
				}
			}
		}
		return categoriesUsedInForm;
	}
	
    private void listChildren(Category parent,int subLevel,List<Category> categoriesUsedInForm) {
		
		int newSubLevel = subLevel+1;
		Set<Category> children = parent.getChildren();
		
		for(Category subCategory:children) {
			String name = "";
			for(int i = 0;i<newSubLevel ;i++) {
				name += "--";
			}
			name += subCategory.getName();
			System.out.println(subCategory.getName());
			Category tempCategory1 = new Category(name);
			tempCategory1.setId(subCategory.getId());
			tempCategory1.setAlias(subCategory.getAlias());
			tempCategory1.setImage(subCategory.getImage());
			tempCategory1.setEnabled(subCategory.isEnabled());
			categoriesUsedInForm.add(tempCategory1);
			listChildren(subCategory,newSubLevel,categoriesUsedInForm);
		}
	}
    
    
    
      public void save(CategoryDTO category) {
		
		if(category!=null && category.getParentId() == 0) {
   		 Category realCategory = new Category();
       	 realCategory.setEnabled(category.getEnabled());
       	 realCategory.setAlias(category.getAlias());
       	 realCategory.setImage(category.getImage());
       	 realCategory.setName(category.getName());
       	 categoryRepo.save(realCategory);
   	 }else {
   		 Category categoryData = new Category(category.getParentId());
       	 Category realCategory = new Category();
       	 realCategory.setEnabled(category.getEnabled());
       	 realCategory.setAlias(category.getAlias());
       	 realCategory.setImage(category.getImage());
       	 realCategory.setName(category.getName());
       	 realCategory.setParent(categoryData);
       	 categoryRepo.save(realCategory);
   	 }
		
 	}
    
	
      //Get category by id
      public Category get(Integer id) throws CategoryNotFoundException {
    	  
    	  try {
    		  return categoryRepo.findById(id).get();
    	  }catch(NoSuchElementException e) {
    		  throw new CategoryNotFoundException("No such category found");
    	  }
    	  
      }
      
      //update category by id
      public String update(Integer id,CategoryDTO category) throws CategoryNotFoundException{
    	  try {
    		  
    		  if(category.getParentId() == 0) {
    			  
    			  Category childCategory = get(id);
    			  childCategory.setAlias(category.getAlias());
    			  childCategory.setName(category.getName());
    			  childCategory.setEnabled(category.getEnabled());
    			  childCategory.setImage(category.getImage());
    			  childCategory.setParent(null);
    			  
    			  
    		  }else {
    			  Category parentCategory = get(category.getParentId());
    			  Category childCategory = get(id);
    			  childCategory.setAlias(category.getAlias());
    			  childCategory.setName(category.getName());
    			  childCategory.setParent(parentCategory);
    			  childCategory.setEnabled(category.getEnabled());
    			  childCategory.setImage(category.getImage());
    			  
    		  }
    		  
    		  
    		  
    	  }catch(CategoryNotFoundException e) {
    		  throw new CategoryNotFoundException("Category not found");
    	  }
      
      return "OK";
      }
      
      
      //delete a category with a specific id
  	public void delete(Integer id) throws CategoryNotFoundException {
  		Long countById = categoryRepo.countById(id);
  		if(countById== null || countById == 0) {
  			throw new CategoryNotFoundException("No category found with the id "+id);
  		}
  		
  		categoryRepo.deleteById(id);
  	}
    
      
	
	
	

}
