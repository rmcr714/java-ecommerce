package com.mycart.admin.category;

import java.io.IOException;
import java.util.HashMap;
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

import com.mycart.admin.user.UserExcelExporter;
import com.mycart.admin.user.UserNotFoundException;
import com.mycart.common.dto.CategoryDTO;
import com.mycart.common.dto.UserDTO;
import com.mycart.common.entity.Category;
import com.mycart.common.entity.User;


@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@Autowired
	CategoryRepository categoryRepo;
	
	
/*
 * @desc: Get all categories, for the first page
 * 
 * */
	@GetMapping(value = "/")
	public Map<Object, Object> listFirstPage(){
		
		
		return listByPage(1,"id","asc",null);	
		

	}
	
	
	
	
	
	
    /*********************************** Get Categories by pagination and sorting	***************************************/
	@GetMapping(value = "/page/{pageNum}/sort")
    public Map<Object,Object> listByPage(@PathVariable Integer pageNum,@Param("sortField") String 
				sortField,@Param("sortField") String sortDir,@Param("keyword") String keyword ) {
			
			Page<Category> pageCategory = categoryService.listByPage(pageNum,sortField,sortDir,keyword); 
			List<Category> listCategories = pageCategory.getContent();
			if(keyword.length()==0) {
			listCategories = categoryService.listCategoriesInHierarchicalForm(listCategories);//comment out this line if dont want categories in hierarchical form
			}
			long startCount = (pageNum - 1)*CategoryConstants.CATEGORIES_PER_PAGE + 1; 
			long endCount = startCount + CategoryConstants.CATEGORIES_PER_PAGE - 1;
			
			if(endCount > pageCategory.getTotalElements()) {
				endCount = pageCategory.getTotalElements();
			}
			
			Map<Object,Object> pageMap = new HashMap<>();
			pageMap.put("startCount", startCount);
			pageMap.put("endCount", endCount);
			pageMap.put("totalItems", pageCategory.getTotalElements());
			pageMap.put("AllCategories", listCategories);
			pageMap.put("pageSize ",CategoryConstants.CATEGORIES_PER_PAGE);

			return pageMap;
		}
		
	
	
	
	
	
	
	
	/************************************** Get Hierarchical Categories *********************************/
     @GetMapping(value = "/listCategories")
     public Map<Object,Object> listHierarchicalCategories(){
        	 
        	 List<Category> data =  categoryService.listCategoriesUsedInForm();
        	 Map<Object,Object> categories = new HashMap<>();
        	 categories.put("categories",data);
        	 return categories;
         }
     
     
     
     
     
     
     
     /**
      * 
      * @desc: Save New Category
      * @param: CategoryDto object 
      * @return : String message ok
      * 
      * */
     @PostMapping(value = "/new")
     public String saveCategory(@RequestBody CategoryDTO category) {
    	 
    	 categoryService.save(category);

    	 return "ok";
     }
     
     
   //get category data by id
 	@GetMapping(value="/get_category/{id}")
 	public ResponseEntity<Category> getCategoryById(@PathVariable("id") Integer id) throws CategoryNotFoundException {
 		ResponseEntity<Category> response = null;
 		try {
 		System.out.println("Data");
 		Category category =  categoryService.get(id);
 		response = new ResponseEntity<Category>(category, HttpStatus.OK);
 		
 		}catch(CategoryNotFoundException ex) {
 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 		}
 		
 		return response;
 	
 	}
 	
 	
 	//edit a category by id
 	@PostMapping(value = "/edit/{id}")
 	public String editCategory(@RequestBody CategoryDTO category,@PathVariable("id") Integer id) throws CategoryNotFoundException{
 		
 		categoryService.update(id, category);
 		
 		 
 		return "OK";
 	}
 	
 	//delete a category with a specific id
 	@DeleteMapping(value = "/delete/{id}")
	public String deleteUser(@PathVariable Integer id) throws CategoryNotFoundException {
		categoryService.delete(id);
		return "OK";
	}
     
    
 	//Export to Excel
 		@GetMapping(value = "/export/excel")
 		public void exporTotExcel(HttpServletResponse response) throws IOException {
 			List<Category> listCategories = categoryService.listAll();
 			listCategories = categoryService.listCategoriesInHierarchicalForm(listCategories);
 			CategoryExcelExporter exporter = new CategoryExcelExporter();
 			exporter.export(listCategories, response);
 		}
 	
 	
     
         
         
         
         
         
		
		
	
	
}
