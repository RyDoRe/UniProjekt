package database;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MySQLAccess {
	private Connection connect = null;
	private Statement statement = null;
	private ResultSet resultSet = null;

	public Connection connect() throws Exception {
		// This will load the MySQL driver, each DB has its own driver
		Class.forName("com.mysql.cj.jdbc.Driver");
		
		
		// Setup the connection with the DB 
		//If the database localhost user is named different than root please change the name and add ,if neccesary a password
		connect = DriverManager
				.getConnection("jdbc:mysql://localhost/taskman?"
						+ "user=root"/* + "password=?"*/);
		return connect;
	};

	public ResultSet readFromDB(String tableName, Map<String, String> searchMap, boolean negativeSearch) throws Exception {
		if(connect == null) {
			this.connect();
		}

		if (searchMap == null) {
			statement = connect.createStatement();
			System.out.println("select * from taskman." + tableName);
			resultSet = statement
					.executeQuery("select * from taskman." + tableName);
		}else {
			statement = connect.createStatement();

			String sqlValue = statementHelperRead(searchMap,negativeSearch);
			System.out.println("select * from taskman." + tableName + " "+sqlValue);
			resultSet = statement
					.executeQuery("select * from taskman." + tableName + " "+sqlValue);
		}
		return resultSet;
	}


	public void writeIntoDB(String tableName, ArrayList<Object> dataSet) throws Exception {

		if(connect == null) {
			this.connect();
		}

		String sqlpart =  preparedStatementHelperWrite(dataSet);
		if(sqlpart == null) {
			return;
		}
		System.out.println("insert into  taskman."+tableName+" values " + sqlpart);
		PreparedStatement preparedStatement = connect
				.prepareStatement("insert into  taskman."+tableName+" values " + sqlpart);
		for(int i = 0; i < dataSet.size(); i++) {
			int index = i+1;
			preparedStatement = this.fillPreparedStatementWithValues(preparedStatement, index, dataSet.get(i));
		}

		preparedStatement.executeUpdate();
	}

	public void updateDBEntry(String tableName, HashMap<String,Object> dataMap) throws Exception {
		if(connect == null) {
			this.connect();
		}

		String sqlpart =  preparedStatementHelperUpdate(dataMap);
		if(sqlpart == null) {
			return;
		}

		System.out.println("UPDATE taskman."+tableName+" SET " + sqlpart + " WHERE id = " + ((String)dataMap.get("id")));
		PreparedStatement preparedStatement = connect
				.prepareStatement("UPDATE taskman."+tableName+" SET " + sqlpart + " WHERE id = " + "'"+((String)dataMap.get("id"))+"'");

		int index = 0;
		for ( Map.Entry<String, Object> inputs : dataMap.entrySet()) {
			inputs.getValue();
			preparedStatement = this.fillPreparedStatementWithValues(preparedStatement, ++index, inputs.getValue());
		}
		preparedStatement.executeUpdate();
	}

	public void deleteDBEntry(String tableName, String coulmnName, String elementID) throws Exception {
		if(connect == null) {
			this.connect();
		}

		System.out.println("DELETE FROM " + tableName + " WHERE "+ coulmnName +" =" + "'"+ elementID + "'");
		PreparedStatement st = connect.prepareStatement("DELETE FROM " + tableName + " WHERE "+coulmnName+" =" + "'"+ elementID + "'");
		st.executeUpdate(); 
	}

	private String preparedStatementHelperWrite(ArrayList<Object> input) {

		String sqlpart = null;
		if(input.size() !=0) {
			sqlpart = "(";
			for(int i = 0; i < input.size();i++) {
				if(i == input.size()-1) {
					sqlpart = sqlpart.concat("?)");
				}else {
					sqlpart = sqlpart.concat("?, ");
				}
			}
		}
		return sqlpart;
	}

	private String preparedStatementHelperUpdate(HashMap<String,Object> input) {

		String sqlpart = null;
		if(input.size() !=0) {
			sqlpart = "";
			int index = 0;
			for ( Map.Entry<String, Object> inputs : input.entrySet()) {
				String key = inputs.getKey();
				if(index == input.size() - 1) {
					sqlpart = sqlpart.concat(key +"= ?");
				}else {
					sqlpart = sqlpart.concat(key +"= ?,");
				}
				index++;
			}

		}
		return sqlpart;
	}


	private String statementHelperRead(Map<String, String> searchMap,boolean negativeSearch) {
		String sqlpart = null;
		if(searchMap.size() !=0) {
			sqlpart = "WHERE ";
			int index = 0;
			if(negativeSearch == false) {
				for ( Map.Entry<String, String> inputs : searchMap.entrySet()) {
					String key = inputs.getKey();
					String value = inputs.getValue();
					if(index == searchMap.size() - 1) {
						sqlpart = sqlpart.concat(key +"= " + "'" + value + "'");
					}else { 
						sqlpart = sqlpart.concat(key +"= " + "'" + value+ "'" + " AND ");
					}
					index++;
				}
			}else {
				for ( Map.Entry<String, String> inputs : searchMap.entrySet()) {
					String key = inputs.getKey();
					String value = inputs.getValue();
					if(index == searchMap.size() - 1) {
						sqlpart = sqlpart.concat(key +"!= " + "'" + value + "'");
					}else { 
						sqlpart = sqlpart.concat(key +"!= " + "'" + value+ "'" + " AND ");
					}
					index++;
				}
			}

		}
		return sqlpart;
	}

	private PreparedStatement fillPreparedStatementWithValues(PreparedStatement statement, int index, Object value) throws Exception {

		if(value instanceof String) {
			statement.setString(index, (String) value);
		}
		if(value instanceof Integer) {
			statement.setInt(index, (Integer) value);
		}
		if(value instanceof Double) {
			statement.setDouble(index, (Double) value);
		}
		if(value instanceof Float) {
			statement.setFloat(index, (Float) value);
		}
		if(value instanceof Long) {
			statement.setLong(index, (long) value);
		}
		if(value instanceof Array) {
			statement.setArray(index, (Array) value);
		}
		if(value instanceof Boolean) {
			statement.setBoolean(index, (Boolean) value);
		}
		if(value instanceof Enum) {
			statement.setString(index, ((Enum<?>) value).toString());
		}
		return statement;
	}

}