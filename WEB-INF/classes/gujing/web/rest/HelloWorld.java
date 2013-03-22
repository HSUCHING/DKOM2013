package gujing.web.rest;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class HelloWorld {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String,String> sayHello() {
		Map<String,String> result = new HashMap<String,String>();
		result.put("a", "A");
		return result;
	}
	
	@Path("sub1")
	@GET
	public String sub1() {
		return "sub1";
	}
}
