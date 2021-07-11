package com.mycart.admin.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycart.common.dto.UserDTO;
import com.mycart.common.entity.Role;
import com.mycart.common.entity.User;

@RestController
@RequestMapping("/users")
public class UserController {
	
	
	@Autowired
	private UserService service;	
	
	@Autowired
	private UserRepository userRepo;
	
	
	//get all the users
	@GetMapping(value = "/")
	public List<User> getAllUsers(){
		
		return service.listAll();
		
	}
	
	
	//Get all the Available roles
	@GetMapping(value = "/roles")
	public List<Role> getAllRoles(){
		
		return service.listRoles();
		
	}
	
	
	//Create a new User
	@PostMapping(value = "/new")
	public String saveUser(@RequestBody UserDTO user) {
		
		Integer data[]=user.getRoles();
	      for(int i = 0 ;i<data.length;i++) {
	    	  System.out.println(data[i]);
	      }
				
		
		User newUser  = new User(user.getEmail(),user.getPassword(),user.getFirstName(),user.getLastName(),user.getEnabled());
		
      for(int i = 0 ;i<data.length;i++) {
			if(data[i]!=0) {
				Role role = new Role(data[i]);
				newUser.addRole(role);
			}
		
		}
      
      service.save(newUser);
      
      return "OK";
     		
	}
	
	
	
	//check for duplicate ids
	@GetMapping(value = "/check_email/{email}")
	public String checkDuplicateEmail(@PathVariable("email") String email) {
		
		return service.isEmailUnique(email)?"OK":"DUPLICATE";
	}
	
	//check for duplicate email while updating
	@GetMapping(value ="/update_email/{email}/{id}")
	public String CheckEmailWhileUpdate(@PathVariable("email") String email,@PathVariable("id") Integer id) {
		return service.isEmailUniqueWhileUpdate(email, id)?"OK":"DUPLICATE";
	}
	
	
	//get user data by id
	@GetMapping(value="/get_user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) throws UserNotFoundException {
		ResponseEntity<User> response = null;
		try {
		System.out.println("Data");
		User user =  service.get(id);
		response = new ResponseEntity<User>(user, HttpStatus.OK);
		
		}catch(UserNotFoundException ex) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return response;
	
	}
	

	
	
	@PostMapping(value="/edit/{id}")
	public String editUser(@RequestBody UserDTO user,@PathVariable("id") Integer id) throws UserNotFoundException {
		Integer data[]=user.getRoles();
		try {
			User existingUser = service.get(id);
			existingUser.setEmail(user.getEmail());
			existingUser.setFirstName(user.getFirstName());
			existingUser.setLastName(user.getLastName());
			existingUser.setPhotos(user.getPhotos());
			existingUser.setEnabled(user.getEnabled());
			
			for(int i = 0 ;i<data.length;i++) {
				if(data[i]!=0) {
					Role role = new Role(data[i]);
					existingUser.addRole(role);
				}
			
			}	
			
			if(user.getPassword()!="") {
				existingUser.setPassword(user.getPassword());
				service.save(existingUser);
			
			}else {
				userRepo.save(existingUser);
			}
			
			
		
		}catch(UserNotFoundException ex) {
			throw ex;
		}
		return "OK";
	}
		
		

}
