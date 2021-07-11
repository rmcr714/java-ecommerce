package com.mycart.common.dto;

import java.util.Arrays;
import java.util.Set;



public class UserDTO {
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String photos;
	private Boolean enabled;
	private Integer[] roles;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPhotos() {
		return photos;
	}
	public void setPhotos(String photos) {
		this.photos = photos;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public Integer[] getRoles() {
		return roles;
	}
	public void setRoles(Integer[] roles) {
		this.roles = roles;
	}
	@Override
	public String toString() {
		return "UserDTO [email=" + email + ", password=" + password + ", firstName=" + firstName + ", lastName="
				+ lastName + ", photos=" + photos + ", enabled=" + enabled + ", roles=" + Arrays.toString(roles) + "]";
	}
	
	
	
}
