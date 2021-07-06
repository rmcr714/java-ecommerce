package com.mycart.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"com.mycart.common.entity","com.mycart.admin.user"})
public class MycartBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(MycartBackEndApplication.class, args);
	}

}
