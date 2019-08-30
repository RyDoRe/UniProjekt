package entities;

import java.util.ArrayList;
import java.util.UUID;

import utils.GeneralResources;
import utils.Ignore;

public class Board extends GeneralResources{

	private String id;
	private String name;
	@Ignore
	private ArrayList<Page> pages;
	@Ignore
	private ArrayList<String> taskIds;


	public ArrayList<Page> getPages() {
		return pages;
	}
	public void setPages(ArrayList<Page> pages) {
		this.pages = pages;
	}
	public ArrayList<String> getTaskIds() {
		return taskIds;
	}
	public void setTaskIds(ArrayList<String> taskIds) {
		this.taskIds = taskIds;
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
}
