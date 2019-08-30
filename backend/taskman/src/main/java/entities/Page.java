package entities;

import java.util.ArrayList;

import utils.GeneralResources;
import utils.Ignore;

public class Page extends GeneralResources{

	private String id;
	private String name;
	private String state;
	private boolean isDefault;
	@Ignore
	private ArrayList<String> boardId;
	@Ignore
	private int displayOrder;
	private int defaultDisplayOrder;
	
	
	
	public int getDefaultDisplayOrder() {
		return defaultDisplayOrder;
	}
	
	public void setDefaultDisplayOrder(int defaultDisplayOrder) {
		this.defaultDisplayOrder = defaultDisplayOrder;
	}
	
	public boolean isDefault() {
		return isDefault;
	}
	
	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public int getDisplayOrder() {
		return displayOrder;
	}
	
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	public ArrayList<String> getBoardId() {
		return boardId;
	}
	
	public void setBoardId(ArrayList<String> boardId) {
		this.boardId = boardId;
	}
}
