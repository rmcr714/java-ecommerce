package com.mycart.admin.user;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mycart.common.entity.User;
import com.mycart.common.entity.Role;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public List<User> listAll(){
		return (List<User>) userRepo.findAll();
		
	}
	
	public List<Role> listRoles(){
		return (List<Role>) roleRepo.findAll();
	}
	
	
	public void save(User user) {
		
	   encodePassword(user);
		
		userRepo.save(user);
	}
	
	
	private void encodePassword(User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
	}
	
	
	//check for unique email while creating a new user
	public boolean isEmailUnique(String email) {
		
	User userByEmail = 	userRepo.getUserByEmail(email);
	return userByEmail == null;
		
	}
	
	
	//check user for unique email while update
	public boolean isEmailUniqueWhileUpdate(String email,Integer id) {
		User userByEmail = 	userRepo.getUserByEmail(email);
		if(userByEmail == null) return true;
		
		if(userByEmail.getId()!=id) {
			return false;
		}
		
		return true;
		
	}
	
	
	
	
	
	
	public User get(Integer id) throws UserNotFoundException {
		try {
		return userRepo.findById(id).get();
		}catch(NoSuchElementException ex) {
			throw new UserNotFoundException("Could not find any user with the id "+id);
		}
	}
	
}
