package com.mycart.admin.category;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.mycart.common.entity.Category;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //this will tell junit to use our normal db
@Rollback(false)    //default behaviour is rollback after the test but this will persist it
public class CategoryRepositoryTest {
	
	
	@Autowired
	private CategoryRepository repo;
	
	
/*
 * Test creating root category
 * */
	@Test
	public void testCreateRootCategory() {
		
		Category category = new Category("ELECTRONICS");
		Category savedCategory = repo.save(category);
		assertThat(savedCategory.getId()).isGreaterThan(0);
		
	}
	
	
	/*
	 * Test creating sub category
	 * */
	@Test
	public void testSubCategory() {
		
		Category parent = new Category(8);
		Category subCategory = new Category("iphone",parent);
		repo.save(subCategory);
		assertThat(subCategory.getId()).isGreaterThan(0);
	}
	
	
	/*
	 * Test getting a category by id
	 * */
	@Test
	public void testGetCategory() {
		Optional<Category> data = repo.findById(1);
		Category category = data.get();
		System.out.println("Category Name "+category.getName());
		Set<Category> children = category.getChildren();
		System.out.println(children);
		
		for(Category subcategory:children) {
			System.out.println(subcategory.getName());
		}
		
		assertThat(children.size()).isGreaterThan(0);
	}
	
	
/* 
 * Print all the categories and subcategories in hierarchical fashion 
 * */
	@Test
	public void printHierarchicalCategories() {
		Iterable<Category>  categories = repo.findAll();
		
		for(Category category:categories) {
			if(category.getParent() == null) {
				System.out.println(category.getName());
				Set<Category> children = category.getChildren();
				for(Category subCategory:children) {
					System.out.println("--"+subCategory.getName());
					printChildren(subCategory,1);
				}
			}
		}
	}
	
	
	private void printChildren(Category parent,int subLevel) {
		
		int newSubLevel = subLevel+1;
		
		for(Category subCategory:parent.getChildren()) {
			for(int i = 0;i<newSubLevel ;i++) {
				System.out.print("--");
			}
			System.out.println(subCategory.getName());
			printChildren(subCategory,newSubLevel);
		}
	}
	
	

}
