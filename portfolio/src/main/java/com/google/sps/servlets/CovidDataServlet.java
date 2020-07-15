package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns world covid data as a JSON object */
@WebServlet("/covid-data")
public class CovidDataServlet extends HttpServlet {

  private LinkedHashMap<String, Integer> covidData = new LinkedHashMap<>();

  @Override
  public void init() {
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/owid-covid-data-world.csv"));
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      String date = cells[0];
      Integer num = Integer.valueOf(cells[1]);

      covidData.put(date, num);
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(covidData);
    response.getWriter().println(json);
  }
}
