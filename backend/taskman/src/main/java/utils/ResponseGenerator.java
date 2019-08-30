package utils;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class ResponseGenerator {

	private ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	private String json;
	public String createJson(Object value) {
		try {
			json = ow.writeValueAsString(value);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}
	
	public Response generateResponse(Object value) {
		String json = this.createJson(value);
		return Response.ok(json,MediaType.APPLICATION_JSON).build();	
	}
}
