package utils;

import java.lang.reflect.Field;


import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class GeneralResources {

	@JsonIgnore
	public ArrayList<Object> getObjectListOfProperties(){

		ArrayList<Object> list = new ArrayList<Object>();
		try {
			for(Field field: this.getClass().getDeclaredFields()) {
				field.setAccessible(true);
				if (!field.isAnnotationPresent(Ignore.class)) {
					list.add(field.get(this));
				}

			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return list;
	}

	@JsonIgnore
	public HashMap<String,Object> getObjectMapofProperties(){

		HashMap<String,Object> map = new HashMap<String,Object>();
		try {
			for(Field field: this.getClass().getDeclaredFields()) {
				field.setAccessible(true);
				if (!field.isAnnotationPresent(Ignore.class)) {
					map.put(field.getName(), field.get(this));
				}
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return map;
	}
}
