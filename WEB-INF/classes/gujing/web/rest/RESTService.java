package gujing.web.rest;

import gujing.bean.Area;
import gujing.bean.LocationRentalDistance;
import gujing.bean.Store;
import gujing.bean.StoreRevenueCost;
import gujing.service.BusinessService;

import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/gujing")
public class RESTService {
	
	@Path("areas")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer,Area> getAreas(@QueryParam("fromYear") int fromYear, @QueryParam("toYear") int toYear){
		return BusinessService.getAreas(fromYear, toYear);
		
	}
	
	@Path("init")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public InitResponse init(@QueryParam("areaId") int areaId,@QueryParam("fromYear") int fromYear, @QueryParam("toYear") int toYear,
			@QueryParam("getLocations") boolean getLocations,@QueryParam("getRentals") boolean getRentals,
			@QueryParam("getStores") boolean getStores, @QueryParam("getDistances") boolean getDistances,
			@QueryParam("getRentalCharacteristic") boolean getRentalCharacteristic){
		InitResponse result = new InitResponse();
		result.areaId = areaId;
		if(getLocations){
			result.locationData = BusinessService.getLocations(areaId, fromYear, toYear);
		}
		if(getRentals){
			result.rentalData = BusinessService.getRentals(areaId, fromYear, toYear);
		}
		if(getStores){
			result.storeData = BusinessService.getStores(areaId, fromYear, toYear);
		}
		if(getDistances){
			result.distanceData = BusinessService.getLocationRentalDistances(areaId);
		}
		if(getRentalCharacteristic){
			result.rentalCharacteristicData = BusinessService.getAdvantageAndDisadvantage(areaId, fromYear, toYear);
		}
		
		return result;
	}
	
	@Path("updateDistances")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateDistances(@QueryParam("areaId") int areaId, List<LocationRentalDistance> distances){
		BusinessService.updateLocationRentalDistances(areaId,distances);
	}
	
	@Path("updateStore")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Store updateStore(@QueryParam("fromYear") int fromYear, @QueryParam("toYear") int toYear, Store store){
		return BusinessService.updateStore(store, fromYear, toYear);
	}
	
	@Path("updateStore")
	@DELETE
	public void deleteStore(@QueryParam("storeId") int storeId){
		BusinessService.deleteStore(storeId);
	}
	
	@Path("doPrediction")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public  Map<Integer, StoreRevenueCost> doPrediction(@QueryParam("type") int type,@QueryParam("areaId") int areaId,@QueryParam("fromYear") int fromYear, @QueryParam("toYear") int toYear){
		return BusinessService.doPrediction(type, fromYear, toYear, areaId);
	}
}
