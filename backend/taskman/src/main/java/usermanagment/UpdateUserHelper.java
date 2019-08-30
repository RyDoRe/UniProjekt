package usermanagment;

public class UpdateUserHelper {
	private String id;
	private String firstname;
	private String lastname;
	private String oldPassword;
	private String newPassword;
	private String newPasswordConfirmed;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getNewPasswordConfirmed() {
		return newPasswordConfirmed;
	}
	public void setNewPasswordConfirmed(String newPasswordConfirmed) {
		this.newPasswordConfirmed = newPasswordConfirmed;
	}
}
