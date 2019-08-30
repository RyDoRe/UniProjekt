package entities;

import java.util.UUID;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;

import usermanagment.UserRoles;
import utils.GeneralResources;

@XmlRootElement
public class User extends GeneralResources{


	private String id;
	private String firstname;
	private String lastname;
	private String username;
	private String userPassword;
	private String accessToken;
	private UserRoles userRole;

	public User() {};

	public User(String username, String userPassword) {
		super();
		this.id = UUID.randomUUID().toString();
		this.firstname = "";
		this.lastname = "";
		this.username = username;
		this.userPassword = userPassword;
		this.accessToken = "";
		this.userRole = UserRoles.USER;
	}




	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	@JsonIgnore
	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public UserRoles getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRoles userRole) {
		this.userRole = userRole;
	}


}
