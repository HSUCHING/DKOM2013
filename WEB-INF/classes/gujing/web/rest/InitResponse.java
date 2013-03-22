package gujing.web.rest;

import gujing.bean.Location;
import gujing.bean.LocationRentalDistance;
import gujing.bean.Rental;
import gujing.bean.RentalCharacteristic;
import gujing.bean.Store;

import java.util.List;
import java.util.Map;

public class InitResponse {

	public int areaId;
	public Map<Integer, Location> locationData;
	public Map<Integer, Rental> rentalData;
	public Map<Integer, Store> storeData;
	public List<LocationRentalDistance> distanceData;
	public  Map<Integer,RentalCharacteristic > rentalCharacteristicData;
}
