package services;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.MySQLAccess;
import entities.Board;
import entities.BoardPageRelation;
import entities.Page;
import entities.User;
import usermanagment.RegisterUser;
import utils.ResponseGenerator;


@Path("/board")
public class BoardService {

	ResponseGenerator resgen = new ResponseGenerator();
	MySQLAccess msa = new MySQLAccess();

	@GET
	@Path("/getAllBoards/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getBoard(@PathParam("id") String boardId) throws Exception {
		Board board = new Board();
		ArrayList<Page> pageList = new ArrayList<Page>();
		ArrayList<String> taskIds = new ArrayList<String>();
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", boardId);
		ResultSet resultset =msa.readFromDB("boards", searchMap,false);
		if(resultset.first()) {

			board = getBoardfromResultSet(resultset, board);
		}
		searchMap = new HashMap<String,String>();
		searchMap.put("boardId", boardId);
		ResultSet resultsetsec =msa.readFromDB("boards_pages_relation", searchMap,false);

		if(resultsetsec.first()) {

			int displayOrder = resultsetsec.getInt("displayOrder");

			searchMap = new HashMap<String,String>();
			searchMap.put("id", resultsetsec.getString("pageId"));
			ResultSet resultsetterz =msa.readFromDB("pages", searchMap,false);
			Page page1 = new Page();
			if(resultsetterz.first()) {
				page1.setId(resultsetterz.getString("id"));
				page1.setName(resultsetterz.getString("name"));
				page1.setState(resultsetterz.getString("state"));
				page1.setDefault(resultsetterz.getBoolean("isDefault"));
				page1.setDisplayOrder(displayOrder);
				pageList.add(page1);
			}
			while(resultsetsec.next()) {
				displayOrder = resultsetsec.getInt("displayOrder");

				searchMap = new HashMap<String,String>();
				searchMap.put("id", resultsetsec.getString("pageId"));
				resultsetterz =msa.readFromDB("pages", searchMap,false);
				Page page2 = new Page();
				if(resultsetterz.first()) {
					page2.setId(resultsetterz.getString("id"));
					page2.setName(resultsetterz.getString("name"));
					page2.setState(resultsetterz.getString("state"));
					page2.setDefault(resultsetterz.getBoolean("isDefault"));
					page2.setDisplayOrder(displayOrder);
					pageList.add(page2);
				}
			}

			searchMap = new HashMap<String,String>();
			searchMap.put("boardId", boardId);
			ResultSet resultsetquad =msa.readFromDB("tasks", searchMap,false);
			if(resultsetquad.first()) {
				taskIds.add(resultsetquad.getString("id"));
			}
			while(resultsetquad.next()) {
				taskIds.add(resultsetquad.getString("id"));
			}

			board.setPages(pageList);
			board.setTaskIds(taskIds);

		}
		return resgen.generateResponse(board);
	}

	@GET
	@Path("/getAllBoards")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllBoards() throws Exception {
		ArrayList<Board> boardList = new ArrayList<Board>();


		ResultSet resultset =msa.readFromDB("boards", null, false);
		if(resultset.first()) {

			Board board = new Board();
			ArrayList<Page> pageList = new ArrayList<Page>();
			ArrayList<String> taskIds = new ArrayList<String>();
			Map<String,String> searchMap = new HashMap<String,String>();
			searchMap.put("id", resultset.getString("id"));

			ResultSet resultset4 =msa.readFromDB("boards", null, false);
			if(resultset4.first()) {

				board = getBoardfromResultSet(resultset4, board);
			}
			searchMap = new HashMap<String,String>();
			searchMap.put("boardId", resultset.getString("id"));
			ResultSet resultsetsec =msa.readFromDB("boards_pages_relation", searchMap,false);

			if(resultsetsec.first()) {

				int displayOrder = resultsetsec.getInt("displayOrder");

				searchMap = new HashMap<String,String>();
				searchMap.put("id", resultsetsec.getString("pageId"));
				ResultSet resultsetterz =msa.readFromDB("pages", searchMap,false);
				Page page1 = new Page();
				if(resultsetterz.first()) {
					page1.setId(resultsetterz.getString("id"));
					page1.setName(resultsetterz.getString("name"));
					page1.setState(resultsetterz.getString("state"));
					page1.setDefault(resultsetterz.getBoolean("isDefault"));
					page1.setDisplayOrder(displayOrder);
					pageList.add(page1);
				}
				while(resultsetsec.next()) {
					displayOrder = resultsetsec.getInt("displayOrder");

					searchMap = new HashMap<String,String>();
					searchMap.put("id", resultsetsec.getString("pageId"));
					resultsetterz =msa.readFromDB("pages", searchMap,false);
					Page page2 = new Page();
					if(resultsetterz.first()) {
						page2.setId(resultsetterz.getString("id"));
						page2.setName(resultsetterz.getString("name"));
						page2.setState(resultsetterz.getString("state"));
						page2.setDefault(resultsetterz.getBoolean("isDefault"));
						page2.setDisplayOrder(displayOrder);
						pageList.add(page2);
					}
				}

				searchMap = new HashMap<String,String>();
				searchMap.put("boardId", resultset.getString("id"));
				ResultSet resultsetquad =msa.readFromDB("tasks", searchMap,false);
				if(resultsetquad.first()) {
					taskIds.add(resultsetquad.getString("id"));
				}
				while(resultsetquad.next()) {
					taskIds.add(resultsetquad.getString("id"));
				}

				board.setPages(pageList);
				board.setTaskIds(taskIds);

			}
			boardList.add(board);

			while(resultset.next()) {
				Board newboard = new Board();
				ArrayList<Page> newpageList = new ArrayList<Page>();
				ArrayList<String> newtaskIds = new ArrayList<String>();
				Map<String,String> newsearchMap = new HashMap<String,String>();
				newsearchMap.put("id", resultset.getString("id"));

				ResultSet newresultset4 =msa.readFromDB("boards", newsearchMap, false);
				if(newresultset4.first()) {

					newboard = getBoardfromResultSet(newresultset4, newboard);
				}
				newsearchMap = new HashMap<String,String>();
				newsearchMap.put("boardId", resultset.getString("id"));
				ResultSet newresultsetsec =msa.readFromDB("boards_pages_relation", newsearchMap,false);

				if(newresultsetsec.first()) {

					int displayOrder = newresultsetsec.getInt("displayOrder");

					newsearchMap = new HashMap<String,String>();
					newsearchMap.put("id", newresultsetsec.getString("pageId"));
					ResultSet resultsetterz =msa.readFromDB("pages", newsearchMap,false);
					Page page1 = new Page();
					if(resultsetterz.first()) {
						page1.setId(resultsetterz.getString("id"));
						page1.setName(resultsetterz.getString("name"));
						page1.setState(resultsetterz.getString("state"));
						page1.setDefault(resultsetterz.getBoolean("isDefault"));
						page1.setDisplayOrder(displayOrder);
						newpageList.add(page1);
					}
					while(newresultsetsec.next()) {
						displayOrder = newresultsetsec.getInt("displayOrder");

						newsearchMap = new HashMap<String,String>();
						newsearchMap.put("id", newresultsetsec.getString("pageId"));
						resultsetterz =msa.readFromDB("pages", newsearchMap,false);
						Page page2 = new Page();
						if(resultsetterz.first()) {
							page2.setId(resultsetterz.getString("id"));
							page2.setName(resultsetterz.getString("name"));
							page2.setState(resultsetterz.getString("state"));
							page2.setDefault(resultsetterz.getBoolean("isDefault"));
							page2.setDisplayOrder(displayOrder);
							newpageList.add(page2);
						}
					}

					newsearchMap = new HashMap<String,String>();
					newsearchMap.put("boardId", resultset.getString("id"));
					ResultSet resultsetquad =msa.readFromDB("tasks", newsearchMap,false);
					if(resultsetquad.first()) {
						newtaskIds.add(resultsetquad.getString("id"));
					}
					while(resultsetquad.next()) {
						newtaskIds.add(resultsetquad.getString("id"));
					}

					newboard.setPages(newpageList);
					newboard.setTaskIds(newtaskIds);

				}
				boardList.add(newboard);
			}
		}
		return resgen.generateResponse(boardList);
	}





	@POST
	@Path("/updateBoard")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response updateBoard(Board board) throws Exception {
		//			Board updatedBoard = new Board();

		HashMap<String,Object> boardMap = board.getObjectMapofProperties();
		msa.updateDBEntry("boards", boardMap);
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("boardid", board.getId());
		msa.deleteDBEntry("boards_pages_relation", "boardId", board.getId());



		for (Page page : board.getPages()) {

			BoardPageRelation boardHelper = new BoardPageRelation();
			boardHelper.setBoardId(board.getId());
			boardHelper.setPageId(page.getId());
			boardHelper.setDisplayOrder(page.getDisplayOrder());
			ArrayList<Object> pageList = boardHelper.getObjectListOfProperties();
			msa.writeIntoDB("boards_pages_relation", pageList);
		}

		return resgen.generateResponse(board);
	}


	@POST
	@Path("/addBoard")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response addBoard(Board newBoard) throws Exception {

		ArrayList<Object> boardPropertiesList = newBoard.getObjectListOfProperties();

		//			System.out.println(userlist.size());
		msa.writeIntoDB("boards", boardPropertiesList);
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("isDefault", "1");
		ResultSet resultset = msa.readFromDB("pages", searchMap, false);
		ArrayList<Page> pageList = new ArrayList<Page>();
		if (resultset.first()) {

			Page page = new Page();

			//			userList.add(getUserfromResultSet(resultset,user));
			page.setId(resultset.getString("id"));
			page.setName(resultset.getString("name"));
			page.setState(resultset.getString("state"));
			page.setDefault(resultset.getBoolean("isDefault"));


			BoardPageRelation addHelper = new BoardPageRelation();
			addHelper.setBoardId(newBoard.getId());
			addHelper.setPageId(page.getId());
			addHelper.setDisplayOrder(resultset.getInt("defaultDisplayOrder"));
			ArrayList<Object> dataSet = addHelper.getObjectListOfProperties();
			msa.writeIntoDB("boards_pages_relation", dataSet);

			searchMap = new HashMap<String,String>();
			searchMap.put("boardId", newBoard.getId());
			searchMap.put("pageId", page.getId());
			ResultSet resultsetSec = msa.readFromDB("boards_pages_relation", searchMap, false);
			if (resultsetSec.first()) {
				page.setDisplayOrder(resultsetSec.getInt("displayOrder"));
			}
			pageList.add(page);
			while(resultset.next()) {
				Page page1 = new Page();
				page1.setId(resultset.getString("id"));
				page1.setName(resultset.getString("name"));
				page1.setState(resultset.getString("state"));
				page1.setDefault(resultset.getBoolean("isDefault"));

				addHelper = new BoardPageRelation();
				addHelper.setBoardId(newBoard.getId());
				addHelper.setPageId(page1.getId());
				addHelper.setDisplayOrder(resultset.getInt("defaultDisplayOrder"));
				ArrayList<Object> dataset = addHelper.getObjectListOfProperties();
				msa.writeIntoDB("boards_pages_relation", dataset);


				searchMap = new HashMap<String,String>();
				searchMap.put("boardId", newBoard.getId());
				searchMap.put("pageId", page1.getId());
				resultsetSec = msa.readFromDB("boards_pages_relation", searchMap, false);
				if (resultsetSec.first()) {
					page1.setDisplayOrder(resultsetSec.getInt("displayOrder"));
				}
				pageList.add(page1);
			}
		}
		newBoard.setPages(pageList);
		return resgen.generateResponse(newBoard);
	}

	@DELETE
	@Path("/deleteBoard/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response deleteBoard(@PathParam("id") String boardID) throws Exception {


		ArrayList<Page> pageList = new ArrayList<Page>();

		Map<String,String> searchMapTasks = new HashMap<String,String>();
		searchMapTasks.put("boardId", boardID);
		ResultSet resultsetTasks =msa.readFromDB("tasks", searchMapTasks, false);

		Map<String,String> searchMapPageIds = new HashMap<String,String>();
		searchMapPageIds.put("boardId", boardID);
		ResultSet resultsetPageIds =msa.readFromDB("boards_pages_relation", searchMapPageIds, false);
		

		if(resultsetTasks.first()) {
		String highestPageId = null;
			if(resultsetPageIds.first()) {
				Page page = new Page();
				page.setId(resultsetPageIds.getString("pageId"));
				page.setDisplayOrder(resultsetPageIds.getInt("displayOrder"));
				pageList.add(page);
				while(resultsetPageIds.next()) {
					Page newPage = new Page();
					newPage.setId(resultsetPageIds.getString("pageId"));
					newPage.setDisplayOrder(resultsetPageIds.getInt("displayOrder"));
					pageList.add(newPage);
				}

				highestPageId = pageList.stream().max(Comparator.comparing(Page::getDisplayOrder)).toString();	
			}
			if (!highestPageId.equals(resultsetTasks.getString("pageId"))) {
				return Response.status(400, "Projekt enthält noch Aufgaben, die nicht auf der letzten Projektseite angekommen sind!").build();
			}
			while(resultsetTasks.next()) {
				if (!highestPageId.equals(resultsetTasks.getString("pageId"))) {
					return Response.status(400, "Projekt enthält noch Aufgaben, die nicht auf der letzten Projektseite angekommen sind!").build();
				}
			}

		}

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", boardID);
		ResultSet resultset =msa.readFromDB("boards", searchMap, false);
		Board updateBoard = new Board();
		if (resultset.first()) {
			updateBoard = getBoardfromResultSet(resultset, updateBoard);

			msa.deleteDBEntry("boards","id", boardID);
			msa.deleteDBEntry("boards_pages_relation","boardId", boardID);
			return Response.status(200, "Board" + updateBoard.getName() + "wurde gelöscht").build();
		}else {
			return Response.status(400, "Board" + updateBoard.getName() + "konnte nicht gefunden werden!").build();
		}
	}



	private Board getBoardfromResultSet(ResultSet resultset, Board board) throws Exception {
		board.setId(resultset.getString("id"));
		board.setName(resultset.getString("name"));
		return board;
	}
}
