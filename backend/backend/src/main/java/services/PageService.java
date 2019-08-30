package services;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.MySQLAccess;
import entities.Page;
import utils.ResponseGenerator;

@Path("/page")
public class PageService {
	ResponseGenerator resgen = new ResponseGenerator();
	MySQLAccess msa = new MySQLAccess();


	@POST
	@Path("/addPage")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response addPage(Page page) throws Exception {

		System.out.println("PageId: " + page.getId());
		System.out.println("PageName: " + page.getName());
		System.out.println("PageState: " + page.getState());
		System.out.println("PageisDefault: " + page.isDefault());
		System.out.println("PagedefaultDisplayOrder: " + page.getDefaultDisplayOrder());
		//		System.out.println("PageBoardIDsListSize: " + page.getBoardId().size());
		System.out.println("PageDisplayOrder: " + page.getDisplayOrder());

		ArrayList<Object> dataSet = page.getObjectListOfProperties();
		msa.writeIntoDB("pages", dataSet);

		return resgen.generateResponse(page);
	}

	@POST
	@Path("/updatePage")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response updatePage(Page page) throws Exception {

		System.out.println("PageId: " + page.getId());
		System.out.println("PageName: " + page.getName());
		System.out.println("PageState: " + page.getState());
		System.out.println("PageisDefault: " + page.isDefault());
		System.out.println("PagedefaultDisplayOrder: " + page.getDefaultDisplayOrder());
		//		System.out.println("PageBoardIDsListSize: " + page.getBoardId().size());
		System.out.println("PageDisplayOrder: " + page.getDisplayOrder());

		HashMap<String,Object> pageMap = page.getObjectMapofProperties();
		msa.updateDBEntry("pages", pageMap);

		return resgen.generateResponse(page);
	}

	@GET
	@Path("/getPages")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllPages() throws Exception {
		ArrayList<Page> pageList = new ArrayList<Page>();


		//		Map<String,String> searchMap = new HashMap<String,String>();
		//		searchMap.put("boardId", boardId);
		ResultSet resultset =msa.readFromDB("pages", null, false);
		if(resultset.first()) {
			Page pageInstance = new Page();

			pageInstance = getPagefromResultSet(resultset, pageInstance);
			pageList.add(pageInstance);
			while(resultset.next()) {

				pageInstance = new Page();
				pageInstance = getPagefromResultSet(resultset, pageInstance);
				pageList.add(pageInstance);
			}

		}
		return resgen.generateResponse(pageList);
	}

	@GET
	@Path("/getCustomPages/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getCustomPages(@PathParam("id") String boardId) throws Exception {
		ArrayList<Page> pageList = new ArrayList<Page>();


		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("isDefault", "0");
		ResultSet resultset =msa.readFromDB("pages", searchMap, false);
		if(resultset.first()) {
			Page pageInstance = new Page();

			pageInstance = getPagefromResultSet(resultset, pageInstance);
			Map<String,String> searchMapRelDB = new HashMap<String,String>();
			searchMapRelDB.put("boardId", boardId);
			searchMapRelDB.put("pageId", pageInstance.getId());
			ResultSet resultsetRelDb =msa.readFromDB("boards_pages_relation", searchMapRelDB, false);
			if(!resultsetRelDb.first()) {
				pageList.add(pageInstance);
			}
			while(resultset.next()) {

				pageInstance = new Page();
				pageInstance = getPagefromResultSet(resultset, pageInstance);
				
				
				searchMapRelDB = new HashMap<String,String>();
				searchMapRelDB.put("boardId", boardId);
				searchMapRelDB.put("pageId", pageInstance.getId());
				resultsetRelDb =msa.readFromDB("boards_pages_relation", searchMapRelDB, false);
				if(!resultsetRelDb.first()) {
					pageList.add(pageInstance);
				}
				
			}

		}
		return resgen.generateResponse(pageList);
	}


	@DELETE
	@Path("/deletePage/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response deletePage(@PathParam("id") String pageId) throws Exception {


		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("pageId", pageId);
		ResultSet resultset =msa.readFromDB("tasks", searchMap,false);
		if(resultset.first()) {
			return Response.status(400, "Page hat noch offene Tasks und kann nicht gelöscht werden!").build();
		}else {
			msa.deleteDBEntry("pages", "id", pageId);
			return Response.status(200, "Page wurde gelöscht").build();
		}
	}



	private Page getPagefromResultSet(ResultSet resultset, Page page) throws Exception {
		page.setId(resultset.getString("id"));
		page.setName(resultset.getString("name"));
		page.setState(resultset.getString("state"));
		page.setDefault(resultset.getBoolean("isDefault"));
		page.setDefaultDisplayOrder(resultset.getInt("defaultDisplayOrder"));
		//		page.setUserId(resultset.getString("userId"));
		//		page.setPageId(resultset.getString("pageId"));
		//		page.setBoardId(resultset.getString("boardId"));
		return page;
	}


}
