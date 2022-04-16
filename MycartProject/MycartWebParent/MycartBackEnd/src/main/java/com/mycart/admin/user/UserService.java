package com.mycart.admin.user;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mycart.common.dto.ImageDTO;
import com.mycart.common.entity.Role;
import com.mycart.common.entity.User;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
    private Environment env;
	
	public List<User> listAll(){
		return (List<User>) userRepo.findAll();
		
	}
	
	public Page<User> listByPage(int pageNum){
		Pageable pageable = PageRequest.of(pageNum-1, UserConstants.USERS_PER_PAGE);
		return userRepo.findAll(pageable);
		
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
	
	
	
	
	
	//get an user with a specific id
	public User get(Integer id) throws UserNotFoundException {
		try {
		return userRepo.findById(id).get();
		}catch(NoSuchElementException ex) {
			throw new UserNotFoundException("Could not find any user with the id "+id);
		}
	}
	
	//delete an user with a specific id
	public void delete(Integer id) throws UserNotFoundException {
		Long countById = userRepo.countById(id);
		if(countById== null || countById == 0) {
			throw new UserNotFoundException("No user found with the id "+id);
		}
		
		userRepo.deleteById(id);
	}
	
	
	
	public Map<Object,Object> uploadImage(@RequestBody ImageDTO image) throws IOException {
		System.out.println("here");
		System.out.println(image.getImage());
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", env.getProperty("cname"),
				"api_key", env.getProperty("apikey"),
				"api_secret", env.getProperty("apisecret"),
				"secure", true));
		
		
		
		 Map uploadResult = cloudinary.uploader().upload(image.getImage(), ObjectUtils.emptyMap());
		
		Map<Object,Object> map = new HashMap<>();
		map.put("public_id",uploadResult.get("public_id"));
		map.put("secure_url",uploadResult.get("secure_url"));

		return map;
		
	}
	
	
}
