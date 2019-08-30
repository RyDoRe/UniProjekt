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
import entities.Task;
import utils.ResponseGenerator;

@Path("/task")
public class TaskService {

	ResponseGenerator resgen = new ResponseGenerator();
	MySQLAccess msa = new MySQLAccess();

	@POST
	@Path("/addTask")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response addTask(Task newTask) throws Exception {

		//		System.out.println("TaskID: " + newTask.getId());
		//		System.out.println("TaskName: " + newTask.getName());
		//		System.out.println("TaskDescription: " + newTask.getDescription());
		//		System.out.println("TaskstartDate: " + newTask.getStartDate());
		//		System.out.println("TaskEndDate: " + newTask.getEndDate());
		//		System.out.println("TaskUserID: " + newTask.getUserId());
		//		System.out.println("TaskPageID: " + newTask.getPageId());
		//		System.out.println("TaskBoardID: " + newTask.getBoardId());
		ArrayList<Object> taskPropertiesList = newTask.getObjectListOfProperties();
		msa.writeIntoDB("tasks", taskPropertiesList);
		return resgen.generateResponse(newTask);
	}

	@GET
	@Path("/getAllTasks/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllTasksofBoard(@PathParam("id") String boardId) throws Exception {
		ArrayList<Task> taskList = new ArrayList<Task>();
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("boardId", boardId);
		ResultSet resultset =msa.readFromDB("tasks", searchMap, false);
		if(resultset.first()) {
			Task taskInstance = new Task();
			taskInstance = getTaskfromResultSet(resultset, taskInstance);
			taskList.add(taskInstance);
			while(resultset.next()) {
				taskInstance = new Task();
				taskInstance = getTaskfromResultSet(resultset, taskInstance);
				taskList.add(taskInstance);
			}
		}
		return resgen.generateResponse(taskList);
	}

	@GET
	@Path("/getAllTasksOfUser/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getAllTasksofUser(@PathParam("id") String userId) throws Exception {
		ArrayList<Task> taskList = new ArrayList<Task>();
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("userId", userId);
		ResultSet resultset =msa.readFromDB("tasks", searchMap, false);
		if(resultset.first()) {
			Task taskInstance = new Task();		
			taskInstance = getTaskfromResultSet(resultset, taskInstance);
			taskList.add(taskInstance);
			while(resultset.next()) {			
				taskInstance = new Task();
				taskInstance = getTaskfromResultSet(resultset, taskInstance);
				taskList.add(taskInstance);
			}		
		}
		return resgen.generateResponse(taskList);
	}

	@POST
	@Path("/updateTask")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response updateTasks(Task task) throws Exception {
		HashMap<String,Object> taskMap = task.getObjectMapofProperties();
		msa.updateDBEntry("tasks", taskMap);

		return resgen.generateResponse(task);
	}


	@DELETE
	@Path("/deleteTask/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response deleteTask(@PathParam("id") String taskID) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", taskID);
		ResultSet resultset =msa.readFromDB("tasks", searchMap, false);
		Task taskInstance = new Task();
		if (resultset.first()) {
			taskInstance = getTaskfromResultSet(resultset, taskInstance);
			msa.deleteDBEntry("tasks","id", taskID);
			return Response.status(200, "Task" + taskInstance.getName() + "wurde gelöscht").build();
		}else {
			return Response.status(400, "Task konnte nicht gefunden und gelöscht werden!").build();
		}
	}

	private Task getTaskfromResultSet(ResultSet resultset, Task task) throws Exception {
		task.setId(resultset.getString("id"));
		task.setName(resultset.getString("name"));
		task.setDescription(resultset.getString("description"));
		task.setStartDate(resultset.getLong("startDate"));
		task.setEndDate(resultset.getLong("endDate"));
		task.setUserId(resultset.getString("userId"));
		task.setPageId(resultset.getString("pageId"));
		task.setBoardId(resultset.getString("boardId"));
		return task;
	}

}
