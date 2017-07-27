package com.huagege.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class Lucky extends HttpServlet {

	public Lucky() {
		super();
	}

	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=gb2312");
	    PrintWriter out = response.getWriter();  
	    request.setCharacterEncoding("utf-8");  
		
		String studentNo = request.getParameter("studentNo");
		Workbook wb = new HSSFWorkbook(new FileInputStream(new File(request.getRealPath("/information.xls"))));
		Sheet sheet = wb.getSheetAt(0);
		Iterator<Row> it = sheet.rowIterator();
		while(it.hasNext()){
			Row r = it.next();
			if(r.getCell(2).getStringCellValue().equals(studentNo)){
				System.out.println(r.getCell(1).getStringCellValue());
				out.print(r.getCell(1).getStringCellValue());
			}
		}
		out.flush();
		out.close();
	}

	public void init() throws ServletException {
	}

}
