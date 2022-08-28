package com.mycart.common.dto;

public class CategoryDTO {

	
	
	private String name;
	private String alias;
	private String image;
	private Boolean enabled;
	private Integer parentId;
	
	public CategoryDTO(String name,String alias,String image,Boolean enabled) {
		this.name = name;
		this.alias = alias;
		this.image = image;
		this.enabled = enabled;
	}
	
	
	
	



	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	
	
	
	
	
	
}
