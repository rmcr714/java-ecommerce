package com.mycart.admin.user;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.mycart.common.entity.Role;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //this will tell junit to use our normal db
@Rollback(false)    //default behaviour is rollback after the test but this will persist it
public class RoleRepositoryTests {
	
	
	@Autowired
	private RoleRepository repo;
	
	@Test
	public void testCreateFirstRole(){
		
		Role roleAdmin = new Role("Admin","Manages everything");
		Role savedRole = repo.save(roleAdmin);
		assertThat(savedRole.getId()).isGreaterThan(0);
		
	}
	
	@Test
	public void testRestRoles() {
		Role roleSalesPerson = new Role("Salesperson","manage products price,"+"customers,shipping,Orders and sales report");
		Role roleEditor = new Role("Editor","manage categories,brands,"
		+ "products,articles and menus");
        Role roleShipper = new Role("Shipper","view products, view orders and update order status")	;
        Role roleAssistant = new Role("Assistant","manage questions and reviews");
        
        repo.saveAll(List.of(roleSalesPerson,roleEditor,roleShipper,roleAssistant));
        
        
    
	}

}
