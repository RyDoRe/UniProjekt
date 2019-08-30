package services;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.MySQLAccess;
import entities.User;
import usermanagment.RegisterUser;
import usermanagment.UpdateUserHelper;
import usermanagment.UserRoles;
import utils.ResponseGenerator;


@Path("/user")
public class UserService {

	ResponseGenerator resgen = new ResponseGenerator();
	MySQLAccess msa = new MySQLAccess();

	@POST
	@Path("/registerUser")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response registerUser(RegisterUser registerUser) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("username", registerUser.getUsername());
		ResultSet resultset =msa.readFromDB("users",searchMap,false);
		Boolean userexists = resultset.first();
		if(userexists) {
			return Response.status(400, "Benutzer existiert bereits!").build();
		}else {
			User newUser = new User(registerUser.getUsername(),registerUser.getUserPassword());
			ArrayList<Object> userlist = newUser.getObjectListOfProperties();
			msa.writeIntoDB("users", userlist);
			return resgen.generateResponse(newUser);
		}
	}

	@POST
	@Path("/loginUser")
	@Produces(MediaType.APPLICATION_JSON)
	public Response loginUser(User user) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("username", user.getUsername());
		ResultSet resultset =msa.readFromDB("users",searchMap,false);
		Boolean valideUser = resultset.first();
		User chekUpUser =new User();
		if(resultset.first()) {
			chekUpUser = getUserfromResultSet(resultset, chekUpUser);
			valideUser = chekUpUser.getUserPassword().equals(user.getUserPassword());
		}
		if(valideUser) {
			chekUpUser.setAccessToken(UUID.randomUUID().toString());
			HashMap<String,Object> userMap = chekUpUser.getObjectMapofProperties();
			msa.updateDBEntry("users", userMap);

			return resgen.generateResponse(chekUpUser);
		}else {
			return Response.status(400, "Benutername oder Password falsch!").build();
		}
	}

	@POST
	@Path("/validateUser")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response validateUser(User user) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", user.getId());
		ResultSet resultset = msa.readFromDB("users",searchMap,false);
		User validateUser = new User();
		if (resultset.first()) {
			validateUser = getUserfromResultSet(resultset, validateUser);
		}
		if(user.getAccessToken() != null &&
				user.getId().equals(validateUser.getId()) && 
				user.getAccessToken().equals(validateUser.getAccessToken())) {
			return resgen.generateResponse(validateUser);
		}else {
			return Response.status(400, "Accesstoken abgelaufen! Sie werden ausgeloggt!").build();
		}
	}

	@GET
	@Path("/getRoles")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getRoles() {

		List<String> roleList = Stream.of(UserRoles.values())
				.map(Enum::name)
				.collect(Collectors.toList());
		return resgen.generateResponse(roleList);
	}

	@GET
	@Path("/getAllUsers/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getUsersWithoutSelectedOne(@PathParam("id") String userId) throws Exception {
		List<User> userList= new ArrayList<User>();
		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", userId);
		ResultSet resultset =msa.readFromDB("users", searchMap, true);
		if(resultset.first()) {
			User user = new User();
			userList.add(getUserfromResultSet(resultset,user));
			while(resultset.next()) {
				User user1 = new User();
				userList.add(getUserfromResultSet(resultset,user1));
			}
		}
		return resgen.generateResponse(userList);
	}

	@GET
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response getUsers() throws Exception {
		List<User> userList= new ArrayList<User>();
		ResultSet resultset =msa.readFromDB("users", null, true);
		if(resultset.first()) {
			User user = new User();
			userList.add(getUserfromResultSet(resultset,user));
			while(resultset.next()) {
				User user1 = new User();
				userList.add(getUserfromResultSet(resultset,user1));
			}
		}
		return resgen.generateResponse(userList);
	}

	@POST
	@Path("/updateUser")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response updateUser(UpdateUserHelper updateUserObject) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", updateUserObject.getId());
		ResultSet resultset =msa.readFromDB("users", searchMap,false);
		User updateUser = new User();
		if(resultset.first()) {
			updateUser = getUserfromResultSet(resultset, updateUser);
			if(updateUserObject.getFirstname() != null) {
				updateUser.setFirstname(updateUserObject.getFirstname());
			}
			if(updateUserObject.getLastname() != null) {
				updateUser.setLastname(updateUserObject.getLastname());
			}
			if(updateUserObject.getOldPassword() != null && updateUserObject.getNewPassword() != null &&  updateUserObject.getNewPasswordConfirmed() != null) {
				if(updateUser.getUserPassword().equals(updateUserObject.getOldPassword())) {
					if(updateUserObject.getNewPassword().equals(updateUserObject.getNewPasswordConfirmed())) {
						updateUser.setUserPassword(updateUserObject.getNewPassword());
					}else {
						return Response.status(400, "Neues Passwort bitte betätigen!").build();

					}
				}else {
					return Response.status(400, "Aktuelles Passwort falsch!").build();
				}
			}
			HashMap<String,Object> userMap = updateUser.getObjectMapofProperties();
			msa.updateDBEntry("users", userMap);
		}
		return resgen.generateResponse(updateUser);
	}

	@POST
	@Path("/updateUserRole")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response updateUserRole(ArrayList<User> users) throws Exception {
		ArrayList<User> updatedUsers = new ArrayList<User>();
		for (User user : users) {
			Map<String,String> searchMap = new HashMap<String,String>();
			searchMap.put("id", user.getId());
			ResultSet resultset =msa.readFromDB("users", searchMap,false);
			if(resultset.first()) {
				User updateUser = new User();
				updateUser = getUserfromResultSet(resultset, updateUser);
				System.out.println(user.getUserRole());
				updateUser.setUserRole(user.getUserRole());

				HashMap<String,Object> userMap = updateUser.getObjectMapofProperties();
				msa.updateDBEntry("users", userMap);
				updatedUsers.add(updateUser);
			}
		}
		return resgen.generateResponse(updatedUsers);
	}


	@DELETE
	@Path("/deleteUser/{id}")
	@Produces(MediaType.APPLICATION_JSON) 
	public Response deleteUser(@PathParam("id") String userID) throws Exception {

		Map<String,String> searchMap = new HashMap<String,String>();
		searchMap.put("id", userID);
		ResultSet resultset =msa.readFromDB("users", searchMap, false);
		User updateUser = new User();
		if (resultset.first()) {
			updateUser = getUserfromResultSet(resultset, updateUser);

			msa.deleteDBEntry("users", "id",userID);
			return Response.status(200, "User" + updateUser.getUsername() + "wurde gelöscht").build();
		}else {
			return Response.status(400, "User" + updateUser.getUsername() + "konnte nicht gefunden werden!").build();		
		}
	}

	private User getUserfromResultSet(ResultSet resultset, User user) throws Exception {
		user.setUsername(resultset.getString("username"));
		user.setId(resultset.getString("id"));
		user.setFirstname(resultset.getString("firstname"));
		user.setLastname(resultset.getString("lastname"));
		user.setUserPassword(resultset.getString("userPassword"));
		user.setUserRole(UserRoles.valueOf(resultset.getString("userRole")));
		user.setAccessToken(resultset.getString("accessToken"));
		return user;
	}


}
