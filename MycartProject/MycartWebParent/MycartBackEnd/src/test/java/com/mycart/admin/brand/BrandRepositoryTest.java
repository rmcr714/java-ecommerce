package com.mycart.admin.brand;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.mycart.common.entity.Brand;
import com.mycart.common.entity.Category;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //this will tell junit to use our normal db
@Rollback(false)    //default behaviour is rollback after the test but this will persist it
public class BrandRepositoryTest {
	
	@Autowired
	BrandRepository repo;
	
	@Test
	public void testCreateBrand() {
		Category laptops = new Category(6);
		Brand Acer = new Brand("Acer");
		Acer.getCategories().add(laptops);
		Brand saveBrand = repo.save(Acer);
		assertThat(saveBrand).isNotNull();
		assertThat(saveBrand.getId()).isGreaterThan(0);
	}
	
	@Test
	public void testCreateBrand1() {
		Category tablets = new Category(7);
		Category cellphones = new Category(4);
		Brand apple = new Brand("Apple");
		apple.getCategories().add(tablets);
		apple.getCategories().add(cellphones);
		Brand saveBrand = repo.save(apple);
		assertThat(saveBrand).isNotNull();
		assertThat(saveBrand.getId()).isGreaterThan(0);
	}
	
	
	@Test
	public void testCreateBrand2() {
		Category ssd = new Category(27);
		Category internalHd = new Category(24);
		Brand Samsung = new Brand("Samsung");
		Samsung.getCategories().add(internalHd);
		Brand saveBrand = repo.save(Samsung);
		assertThat(saveBrand).isNotNull();
		assertThat(saveBrand.getId()).isGreaterThan(0);
	}
	
	
   
}
