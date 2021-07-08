package com.mycart.admin.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import com.mycart.common.entity.Role;
import com.mycart.common.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) //this will tell junit to use our normal db
@Rollback(false)    //default behaviour is rollback after the test but this will persist it
public class UserRepositoryTests {
	
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	public void testCreateUserWithOneRole() {
		Role roleAdmin = entityManager.find(Role.class, 1);
		User userAnurag = new User("anurag@gmail.com","123456","anurag","tiwari",false);
		userAnurag.addRole(roleAdmin);
		
		User savedUser = repo.save(userAnurag);
		assertThat(savedUser.getId()).isGreaterThan(0);
	}
	@Test
	public void testCreateUserWithTwoRoles() {
		User userRavi = new User("ravi@gmail.com","123456","Ravi","kumar",false);
		Role roleEditor = new Role(3);
		Role roleAssistant = new Role(5);
		userRavi.addRole(roleEditor);
		userRavi.addRole(roleAssistant);
		
		User savedUser = repo.save(userRavi);
		assertThat(savedUser.getId()).isGreaterThan(0);
	}
	
	@Test
	public void testListAllUsers() {
		Iterable<User> listUsers= repo.findAll();
		
		listUsers.forEach(user->System.out.println(user));
		
	}
	
	@Test
	public void testGetUserById() {
		User user = repo.findById(1).get();
		System.out.println(user);
       assertThat(user).isNotNull();
		
	}
	
	@Test
	public void testUpdateUserDetails() {
		User user = repo.findById(1).get();
		user.setEnabled(true);
		user.setEmail("anurag123@gmail.com");
		repo.save(user);
		
		
	}
	
	@Test
	public void testUpdateUser() {
		User userRavi = repo.findById(2).get();
		Role roleEditor = new Role(3);
		Role salesPerson = new Role(2);
		userRavi.getRoles().remove(roleEditor);
		userRavi.addRole(salesPerson);
		repo.save(userRavi);
		
	}
	
	
	@Test
	public void testDeleteUser() {
		Integer userId = 2;
		repo.deleteById(userId);
		
	}

}
