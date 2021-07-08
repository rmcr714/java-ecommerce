package com.mycart.admin.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
		
		

}
