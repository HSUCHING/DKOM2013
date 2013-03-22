package gujing.service;

import gujing.bean.Area;
import gujing.bean.Area.AreaTimeInfo;
import gujing.bean.Location;
import gujing.bean.LocationRentalDistance;
import gujing.bean.Rental;
import gujing.bean.Rental.RentalTimeInfo;
import gujing.bean.RentalCharacteristic.RentalCharacteristicTimeInfo;
import gujing.bean.RentalCharacteristic;
import gujing.bean.Store;
import gujing.bean.Store.StoreTimeInfo;
import gujing.bean.StoreRevenueCost;
import gujing.bean.StoreRevenueCost.StoreRevenueCostTimeInfo;
import gujing.dao.DataAccessObject;
import gujing.pal.MerPrediction;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BusinessService {
	
	public static int MER = 1;
	public static int MLR = 2;
	
	public static int LOCATION_TYPE_RESIDENCE_NORMAL = -1;
	public static int LOCATION_TYPE_RESIDENCE_ADVANCED = -2;
	public static int LOCATION_TYPE_RESIDENCE = 1;
	public static int LOCATION_TYPE_SHOPPING_CENTER = 2;
	public static int LOCATION_TYPE_OFFICE_BUILDING = 3;
	public static int LOCATION_TYPE_METRO_STATION = 4;
	public static int LOCATION_TYPE_HOSPITAL = 5;
	
	public static String ADV_NEAR_METRO = "1";
	public static String ADV_NEAR_SHOPPING = "2";
	public static String ADV_NEAR_LARGE_LIVING = "3";
	public static String ADV_LARGE_SQUIRE = "4";
	
	
	public static void main(String args[]){
		Map<Integer, StoreRevenueCost> revenueCost = doPrediction(MER, 2013, 2013, 1);
		System.out.println(revenueCost);
		
	}
	
	public static Map<Integer, Area> getAreas(int fromYear, int toYear){
		Map<Integer, Area> result = null;
		try{
			result = DataAccessObject.getAreaInfo(fromYear, toYear);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static Map<Integer, Location> getLocations(int areaId, int fromYear, int toYear){
		Map<Integer, Location> result = null;
		try{
			result = DataAccessObject.getLocationInfo(areaId, fromYear, toYear);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	public static Map<Integer, Rental> getRentals(int areaId, int fromYear, int toYear){
		Map<Integer, Rental> result = null;
		try{
			result = DataAccessObject.getRentalInfo(areaId, fromYear, toYear);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static Map<Integer, Store> getStores(int areaId, int fromYear, int toYear){
		Map<Integer, Store> result = null;
		try{
			result = DataAccessObject.getStoreInfo(areaId, fromYear, toYear);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static Store updateStore(Store store, int fromYear, int endYear){
		try{
			return DataAccessObject.updateStore(store, fromYear, endYear);
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
	
	public static void deleteStore(int storeId){
		try{
			DataAccessObject.deleteStore(storeId);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public static List<LocationRentalDistance> getLocationRentalDistances(int areaId){
		List<LocationRentalDistance> result = null;
		try{
			result = DataAccessObject.getLocationRentalDistanceInfo(areaId);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static void updateLocationRentalDistances(int areaId, List<LocationRentalDistance> distances){
		try{
			DataAccessObject.updateLocationRentalDistanceInfo(areaId, distances);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	
	
	public static Map<Integer, StoreRevenueCost> doPrediction(int type, int fromYear, int toYear, int areaId){
		Map<Integer, StoreRevenueCost> result = new HashMap<Integer, StoreRevenueCost>();
		List<Double> aiList = null;
		if(type == MER){
			aiList = MerPrediction.getMultipleExponentialRegressionModel(Configuration.HISTORY_DATA_FROM_YEAR);
		}
		else if (type == MLR){
			
		}
		
		
		Map<Integer, Area> areas = getAreas(fromYear, toYear);
		
		Map<Integer, Location> locations = getLocations(areaId, fromYear, toYear);
		Map<Integer, Store> stores = getStores(areaId, fromYear, toYear);
		Map<Integer, Rental> rentals = getRentals(areaId, fromYear, toYear);
		List<LocationRentalDistance> locationRentalDistances = getLocationRentalDistances(areaId);
		
		for(Store store : stores.values()){
			Map<Integer, StoreRevenueCostTimeInfo> timeDepInfoMap = doPrediction(type, aiList, fromYear, toYear, areaId, store.storeId, areas, locations, stores, rentals, locationRentalDistances);
			StoreRevenueCost storeRevenueCost = new StoreRevenueCost();
			storeRevenueCost.storeId = store.storeId;
			storeRevenueCost.timeDepInfoMap = timeDepInfoMap;
			result.put(storeRevenueCost.storeId, storeRevenueCost);
		}
		
		return result;
	}
	
	public static Map<Integer,RentalCharacteristic > getAdvantageAndDisadvantage(int areaId, int fromYear, int toYear){
		Map<Integer,RentalCharacteristic > result = new HashMap<Integer,RentalCharacteristic>();
		
		List<LocationRentalDistance> locationRentalDistances = getLocationRentalDistances(areaId);
		Area area = getAreas(fromYear, toYear).get(areaId);
		Map<Integer, Location> locations = getLocations(areaId, fromYear, toYear);
		Map<Integer, Rental> rentals = getRentals(areaId, fromYear, toYear);
		
		for(Rental rental:rentals.values()){
			RentalCharacteristic rc = new RentalCharacteristic();
			rc.rentId = rental.rentId;
			int currentYear = fromYear;
			
			while(currentYear <= toYear){
				RentalTimeInfo rentalTimeInfo =  rental.timeDepInfoMap.get(currentYear);
				AreaTimeInfo areaTimeInfo = area.timeDepInfoMap.get(currentYear);
				if(rentalTimeInfo == null || areaTimeInfo == null){
					currentYear++;continue;
				}
				
				RentalCharacteristicTimeInfo rentalCharacteristicTimeInfo = new RentalCharacteristicTimeInfo();
				rentalCharacteristicTimeInfo.year = currentYear;
				
				Map<Integer, Integer> locNumOfMap = getLocNumOf(currentYear, locationRentalDistances, rental.rentId, locations);
				
				// adv
				if(locNumOfMap.get(LOCATION_TYPE_RESIDENCE_NORMAL)>=10000 ||locNumOfMap.get(LOCATION_TYPE_RESIDENCE_ADVANCED) >=5000){
					rentalCharacteristicTimeInfo.advLargeLiving = true;
				}
				
				if(locNumOfMap.get(LOCATION_TYPE_HOSPITAL) > 0){
					rentalCharacteristicTimeInfo.advHospital = true;
				}
				
				if(locNumOfMap.get(LOCATION_TYPE_METRO_STATION) > 0){
					rentalCharacteristicTimeInfo.advMetro = true;
				}
				
				if(locNumOfMap.get(LOCATION_TYPE_SHOPPING_CENTER) > 0){
					rentalCharacteristicTimeInfo.advShopping = true;
				}
				
				double rentBaseRate = rentalTimeInfo.rate / rental.squareMeter ;
				double areaBaseRate = areaTimeInfo.ratePerSquareMeter;
				
				if((areaBaseRate - rentBaseRate) / areaBaseRate >= 0.3){
					rentalCharacteristicTimeInfo.advLowRate = true;
				}
				
				if(rental.squareMeter >= 150){
					rentalCharacteristicTimeInfo.advLargeSquire = true;
				}
				
				// dis
				if(locNumOfMap.get(LOCATION_TYPE_RESIDENCE_NORMAL)<3000 && locNumOfMap.get(LOCATION_TYPE_RESIDENCE_ADVANCED) < 5000){
					rentalCharacteristicTimeInfo.disSmallLiving = true;
				}
				
				if(locNumOfMap.get(LOCATION_TYPE_SHOPPING_CENTER) == 0){
					rentalCharacteristicTimeInfo.disShopping = true;
				}
				
				if((rentBaseRate - areaBaseRate) / areaBaseRate >= 0.3){
					rentalCharacteristicTimeInfo.disHighRate = true;
				}
				
				if(rental.squareMeter < 60){
					rentalCharacteristicTimeInfo.disSmallSquire = true;
				}
				
				rc.timeDepInfoMap.put(currentYear, rentalCharacteristicTimeInfo);
				currentYear++;
			}
			
			
			
			
			result.put(rc.rentId, rc);
			
		}
		
		return result;
	}
	
	protected static Map<Integer, StoreRevenueCostTimeInfo> doPrediction(int type, List<Double> aiList, int fromYear, int toYear, int areaId, int storeId, Map<Integer, Area> areas, 
			Map<Integer, Location> locations, Map<Integer, Store> stores, Map<Integer, Rental> rentals, 
			List<LocationRentalDistance> locationRentalDistances){
		Map<Integer, StoreRevenueCostTimeInfo> result = new HashMap<Integer, StoreRevenueCostTimeInfo>();
		int currentYear = fromYear;
		
		
		Area area = areas.get(areaId);
		
		while(currentYear <= toYear){
			AreaTimeInfo areaTimeInfo = area.timeDepInfoMap.get(currentYear);
			if(areaTimeInfo == null){
				currentYear++;continue;
			}
			
			int areaNumOfShoppingCenter = getAreaNumOfShoppingCenter(locations,currentYear);
			int areaNumOfStore = getAreaNumOfStore(stores, currentYear);
			Store store = stores.get(storeId);
			Rental rental = rentals.get(store.rentId);
			StoreTimeInfo storeTimeInfo = store.timeDepInfoMap.get(currentYear);
			if(storeTimeInfo == null) {
				currentYear++;continue;
			}
			
			Map<Integer, Integer> locNumOfMap = getLocNumOf(currentYear, locationRentalDistances, rental.rentId, locations);
			int medicare = 0;
			if(storeTimeInfo.medicare){
				medicare = 1;
			}
			else{
				medicare = 0;
			}
			if(type == MER){
				double revenue = MerPrediction.execute(Configuration.HISTORY_DATA_FROM_YEAR, 
						currentYear, 
						area.type, areaNumOfShoppingCenter, areaNumOfStore, rental.squareMeter, 
						storeTimeInfo.suppliers, storeTimeInfo.cosmeceuticals, storeTimeInfo.otc, storeTimeInfo.rx,
						medicare, 
						locNumOfMap.get(LOCATION_TYPE_SHOPPING_CENTER), locNumOfMap.get(LOCATION_TYPE_OFFICE_BUILDING),
						locNumOfMap.get(LOCATION_TYPE_HOSPITAL), locNumOfMap.get(LOCATION_TYPE_RESIDENCE_NORMAL)
						, locNumOfMap.get(LOCATION_TYPE_RESIDENCE_ADVANCED), areaTimeInfo.numOfBusstop, locNumOfMap.get(LOCATION_TYPE_METRO_STATION)
				)
						;
				
				StoreRevenueCostTimeInfo storeRevenueCostTimeInfo = new StoreRevenueCostTimeInfo();
				storeRevenueCostTimeInfo.year = currentYear;
				storeRevenueCostTimeInfo.revenue = revenue;
				
				//Cost = Revenue *(Supplier * 80% + cosmeceuticals*30% + otc * 40% + rx*50%)
				
				storeRevenueCostTimeInfo.cost = storeRevenueCostTimeInfo.revenue * (storeTimeInfo.suppliers*0.8 + storeTimeInfo.cosmeceuticals*0.3 
						+  storeTimeInfo.otc* 0.4 +  storeTimeInfo.rx*0.5)*0.01 
						+ rental.timeDepInfoMap.get(currentYear).rate // rental rate per year
						+ 0.2*storeTimeInfo.numOfSales*12 ;// 2000 salary per person per month
				
				result.put(currentYear, storeRevenueCostTimeInfo);
			}
			
			currentYear++;
		}
		
		return result;
	}
	
	protected static Map<Integer, Integer> getLocNumOf(int year, List<LocationRentalDistance> locationRentalDistances, int rentId,Map<Integer, Location> locations ){
		Map<Integer, Integer> result = new HashMap<Integer, Integer>(); // <Type, Count>
		result.put(LOCATION_TYPE_RESIDENCE_NORMAL, 0);
		result.put(LOCATION_TYPE_RESIDENCE_ADVANCED, 0);
		result.put(LOCATION_TYPE_SHOPPING_CENTER, 0);
		result.put(LOCATION_TYPE_OFFICE_BUILDING, 0);
		result.put(LOCATION_TYPE_METRO_STATION, 0);
		result.put(LOCATION_TYPE_HOSPITAL, 0);
	
		for(LocationRentalDistance locationRentalDistance : locationRentalDistances){
			if(locationRentalDistance.rentId == rentId && locationRentalDistance.distance <= Configuration.LOCATION_RENTAL_DISTANCE_MAX){
				Location location = locations.get(locationRentalDistance.locationId);
				if(location.type == LOCATION_TYPE_SHOPPING_CENTER
						|| location.type == LOCATION_TYPE_OFFICE_BUILDING
						|| location.type == LOCATION_TYPE_METRO_STATION
						|| location.type == LOCATION_TYPE_HOSPITAL){
					result.put(location.type, result.get(location.type)+1);
				}
				else if(location.type == LOCATION_TYPE_RESIDENCE){
					result.put(LOCATION_TYPE_RESIDENCE_NORMAL, result.get(LOCATION_TYPE_RESIDENCE_NORMAL)+location.timeDepInfoMap.get(year).numOfResidNormal);
					result.put(LOCATION_TYPE_RESIDENCE_ADVANCED, result.get(LOCATION_TYPE_RESIDENCE_ADVANCED)+location.timeDepInfoMap.get(year).numOfResidAdvance);	
				}
			}
		}
		
		return result;
	}
	
	protected static int getAreaNumOfShoppingCenter(Map<Integer, Location> locations, int year){
		int result = 0;
		for(Location location : locations.values()){
			if(location.type == LOCATION_TYPE_SHOPPING_CENTER){
				if(location.timeDepInfoMap.get(year) != null){
					result++;
				}
			}
		}
		
		return result;
	}
	
	protected static int getAreaNumOfStore(Map<Integer, Store> stores, int year){
		int result = 0;
		for(Store store : stores.values()){
			if(store.timeDepInfoMap.get(year) != null){
				result ++;
			}
		}
		
		return result;
	}
	
}
