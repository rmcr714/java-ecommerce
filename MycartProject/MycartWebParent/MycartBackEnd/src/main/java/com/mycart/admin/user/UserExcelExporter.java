package com.mycart.admin.user;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.mycart.common.entity.User;

public class UserExcelExporter extends AbstractExporter{
	
	private XSSFWorkbook workbook ;
	 private XSSFSheet sheet ;
	
	 public UserExcelExporter() {
		 workbook = new XSSFWorkbook();
		 
	 }
	public void writeHeaderLine() {
		sheet = workbook.createSheet("Users");
		XSSFRow row = sheet.createRow(0);
		
		XSSFCellStyle cellStyle = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(14);
		font.setColor(IndexedColors.WHITE.getIndex());
		cellStyle.setFont(font);
		cellStyle.setFillForegroundColor(IndexedColors.BLACK.getIndex());
		cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		
		
		createCell(row,0,"User Id",cellStyle);
		createCell(row,1,"Email",cellStyle);
		createCell(row,2,"First Name",cellStyle);
		createCell(row,3,"Last Name",cellStyle);
		createCell(row,4,"Roles",cellStyle);
		createCell(row,5,"Enabled",cellStyle);
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
	
	
	
	public void export(List<User> listUsers,HttpServletResponse response) throws IOException {
		
		
		super.setResponseHeader(response,"application/octet-stream",".xlsx");
		
		writeHeaderLine();
		writeDateLines(listUsers);
	
		
		ServletOutputStream outputStream = response.getOutputStream();
		workbook.write(outputStream);
		workbook.close();
		outputStream.close();
	
		
	}
	private void writeDateLines(List<User> listUsers) {
		int rowIndex = 1;
		
		XSSFCellStyle cellStyle = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setFontHeight(12);
		cellStyle.setFont(font);
		
		for(User user:listUsers) {
			XSSFRow row = sheet.createRow(rowIndex++);
			int columnIndex = 0;
			
			
			createCell(row,columnIndex++,user.getId(),cellStyle);
			createCell(row,columnIndex++,user.getEmail(),cellStyle);
			createCell(row,columnIndex++,user.getFirstName(),cellStyle);
			createCell(row,columnIndex++,user.getLastName(),cellStyle);
			createCell(row,columnIndex++,user.getRoles().toString(),cellStyle);
			createCell(row,columnIndex++,user.getEnabled(),cellStyle);
		}
		
	}
	
	
	
	
	
	
	
	
	
	

}
