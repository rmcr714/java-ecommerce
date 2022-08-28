package com.mycart.admin.product;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.mycart.common.entity.Product;

public interface ProductRepository extends PagingAndSortingRepository<Product, Integer> {

}
