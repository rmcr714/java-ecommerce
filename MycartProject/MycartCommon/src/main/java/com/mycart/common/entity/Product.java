package com.mycart.common.entity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique=true,length = 256 , nullable = false)
	private String name;
	@Column(unique=true,length = 256 , nullable = false)
	private String alias;
	@Column(length = 512 , nullable = false , name = "short_description")
	private String shortDescription;
	@Column(length = 4096 , nullable = false, name="full_description")
	private String fullDescription;
	
	@Column(name  = "created_at")
	private Date createdAt;
	@Column(name  = "updated_at")
	private Date updatedAt;
	
	private Boolean enabled;
	
	@Column(name = "in_stock")
	private Boolean inStock;
	
	private float price;
	private float cost;
	
	@Column(name = "discount_percent")
	private float discountPercentage;
	
	private float length;
	private float height;
	private float widht;
	private float weight;
	
	private Integer quantity;;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "brand_id")
	private Brand brand;
	
	
	
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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
	public String getShortDescription() {
		return shortDescription;
	}
	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}
	public String getFullDescription() {
		return fullDescription;
	}
	public void setFullDescription(String fullDescription) {
		this.fullDescription = fullDescription;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public Boolean getInStock() {
		return inStock;
	}
	public void setInStock(Boolean inStock) {
		this.inStock = inStock;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public float getDiscountPercentage() {
		return discountPercentage;
	}
	public void setDiscountPercentage(float discountPercentage) {
		this.discountPercentage = discountPercentage;
	}
	public float getLength() {
		return length;
	}
	public void setLength(float length) {
		this.length = length;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public float getWidht() {
		return widht;
	}
	public void setWidht(float widht) {
		this.widht = widht;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	
	
	/****
	 * 
	 * 
	 * wont be returning full category object as it will contain recursive parent categories. 
	 * Its not an issue, revert it to return Category in case when needed.
	 * For this use case currently we only need the id and name and then we can later query based on id
	 * to get the complete category
	 * 
	 * ****/
	public Map<Object,Object> getCategory() {
		Map<Object,Object> map = new HashMap<>();
		map.put("id", category.getId());
		map.put("name", category.getName());
		return map;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	
	
    /**
     * 
     * 
     * wont be returning full brand object as it will contain all categories in array as its one to many. 
     * Its not an issue, revert it to return full bran object in case when needed
     * For this use case currently we only need the id and name and then we can later query based on id
	 * to get the complete category
     *  
     * *****/
	public Map<Object,Object> getBrand() {
		Map<Object,Object> map = new HashMap<>();
		map.put("id", brand.getId());
		map.put("name", brand.getName());
		return map;
	}
	
	
	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + "]";
	}
	
	
	
	
	

}
