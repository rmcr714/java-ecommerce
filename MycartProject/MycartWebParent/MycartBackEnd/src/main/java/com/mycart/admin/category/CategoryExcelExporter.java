package com.mycart.admin.category;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.mycart.common.entity.Category;
import com.mycart.common.entity.User;

public class CategoryExcelExporter extends AbstractCategoryExporter{

	
	private XSSFWorkbook workbook ;
	 private XSSFSheet sheet ;
	
	 public CategoryExcelExporter() {
		 workbook = new XSSFWorkbook();
		 
	 }
	public void writeHeaderLine() {
		sheet = workbook.createSheet("Categories");
		XSSFRow row = sheet.createRow(0);
		
		XSSFCellStyle cellStyle = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(14);
		cellStyle.setFont(font);
		
		
		createCell(row,0,"Category Id",cellStyle);
		createCell(row,1,"Category Name",cellStyle);
		createCell(row,2,"Alias",cellStyle);
//		createCell(row,3,"Last Name",cellStyle);
//		createCell(row,4,"Roles",cellStyle);
//		createCell(row,5,"Enabled",cellStyle);
	}
	
	public void createCell(XSSFRow row,int columnIndex,Object value,XSSFCellStyle style) {
		XSSFCell cell = row.createCell(columnIndex);
		sheet.autoSizeColumn(columnIndex);
		if(value instanceof Integer) {
			cell.setCellValue((Integer)value);
		}else if(value instanceof Boolean) {
			cell.setCellValue((Boolean)value);
		}else {
			cell.setCellValue((String)value);
		}
		
		cell.setCellStyle(style);
	}
	
	
	
	public void export(List<Category> listCategories,HttpServletResponse response) throws IOException {
		
		
		super.setResponseHeader(response,"application/octet-stream",".xlsx");
		
		writeHeaderLine();
		writeDateLines(listCategories);
	
		
		ServletOutputStream outputStream = response.getOutputStream();
		workbook.write(outputStream);
		workbook.close();
		outputStream.close();
	
		
	}
	private void writeDateLines(List<Category> listCategories) {
		int rowIndex = 1;
		
		XSSFCellStyle cellStyle = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setFontHeight(12);
		cellStyle.setFont(font);
		
		for(Category category :listCategories) {
			XSSFRow row = sheet.createRow(rowIndex++);
			int columnIndex = 0;
			
			
			createCell(row,columnIndex++,category.getId(),cellStyle);
			createCell(row,columnIndex++,category.getName(),cellStyle);
			createCell(row,columnIndex++,category.getAlias(),cellStyle);
//			createCell(row,columnIndex++,user.getLastName(),cellStyle);
//			createCell(row,columnIndex++,user.getRoles().toString(),cellStyle);
//			createCell(row,columnIndex++,user.getEnabled(),cellStyle);
		}
		
	}
	
	
	
	
	
	
	
	
	
	
}
