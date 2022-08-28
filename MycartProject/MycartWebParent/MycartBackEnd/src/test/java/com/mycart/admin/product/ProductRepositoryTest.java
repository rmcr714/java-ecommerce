package com.mycart.admin.product;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import com.mycart.common.entity.Brand;
import com.mycart.common.entity.Category;
import com.mycart.common.entity.Product;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //this will tell junit to use our normal db
@Rollback(false)    //default behaviour is rollback after the test but this will persist it
public class ProductRepositoryTest {
	
	@Autowired
	private ProductRepository repo;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	public void testCreateProduct() {
		Brand brand = entityManager.find(Brand.class, 1);
		Category category = entityManager.find(Category.class,6);
		
		Product product = new Product();
		product.setName("Acer Aspire 5");
		product.setAlias("acer_aspire");
		product.setShortDescription("short description of Acer aspire");
		product.setFullDescription("full description of Acer Aspire");
		product.setBrand(brand);
		product.setCategory(category);
		
		product.setPrice(42000);
		product.setCreatedAt(new Date());
		product.setUpdatedAt(new Date());
		product.setEnabled(true);
		product.setInStock(true);
		
		Product saveProduct = repo.save(product);
		
		assertThat(saveProduct).isNotNull();
		assertThat(saveProduct.getId()).isGreaterThan(0);
	}
	
	
	@Test
	public void testListAllProducts() {
		Iterable<Product> product = repo.findAll();
		
		product.forEach(data->System.out.println(data));
	}
	
	
	@Test
	public void testGetProduct() {
		
		Optional<Product> product = repo.findById(3);
		System.out.println(product);
	}
	
	
	@Test
	public void testUpdateProduct() {
		Product product = repo.findById(3).get();
		product.setPrice(43000);
		
		repo.save(product);
		
		Product updatedProduct = repo.findById(3).get();
		
		assertThat(updatedProduct.getPrice()).isEqualTo(43000);
	}

}
