package gujing.dao;

import gujing.bean.Area;
import gujing.bean.Location;
import gujing.bean.LocationRentalDistance;
import gujing.bean.Rental;
import gujing.bean.Store;
import gujing.bean.Store.StoreTimeInfo;
import initial.ConnectionHelper;
import initial.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataAccessObject {
	
	public static void main(String args[]) throws ClassNotFoundException, SQLException{
		System.out.println(getAreaInfo(2013,2013));
		
		System.out.println(getLocationInfo(1,2013,2013));
		
		System.out.println(getRentalInfo(1,2013,2013));
		
		System.out.println(getStoreInfo(1,2013,2013));
		
		System.out.println(getLocationRentalDistanceInfo(1));
		
		List<LocationRentalDistance> distances = new ArrayList<LocationRentalDistance>();
		LocationRentalDistance d = null;
		d = new LocationRentalDistance();
		d.locationId = 101;
		d.rentId = 101;
		d.distance = 100;
		distances.add(d);
		
		d = new LocationRentalDistance();
		d.locationId = 102;
		d.rentId = 102;
		d.distance = 200;
		distances.add(d);
		
		updateLocationRentalDistanceInfo(1,distances);
	}

	public static Map<Integer, Location> getLocationInfo(int areaId,int fromYear, int endYear) throws ClassNotFoundException, SQLException{
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement ps = connection.prepareStatement("select * from "+Constants.TABLE_LOCATION +" AS T1 INNER JOIN "+Constants.TABLE_LOCATION_TIME + " AS T2" +
				" ON T1.ID = T2.ID" +
				" AND AREA_ID = ?" +
				" AND YEAR >= ?" +
				" AND YEAR <= ?");
		ps.setInt(1, areaId);
		ps.setInt(2, fromYear);
		ps.setInt(3, endYear);
		
		ResultSet rs = ps.executeQuery();
		
		Map<Integer,Location> result = new HashMap<Integer,Location>();
		while(rs.next()){
			int locationId = rs.getInt("ID");
			Location location = result.get(locationId);
			if(location == null){
				location = new Location();
				location.locationId = locationId;
				location.areaId = rs.getInt("AREA_ID");
				location.description = rs.getString("DESCR");
				location.type = rs.getInt("TYPE");
				location.latitude = rs.getDouble("LATITUDE_1");
				location.longitude = rs.getDouble("LONGGITUDE_1");
				result.put(locationId, location);
			}
			
			Location.LocationTimeInfo timeInfo = new Location.LocationTimeInfo();
			timeInfo.year = rs.getInt("YEAR");
			timeInfo.scale = rs.getInt("SCALE");
			timeInfo.spendingPower = rs.getInt("SPENDING_POWER");
			timeInfo.numOfResidNormal = rs.getInt("NUM_OF_RESID_NORMAL");
			timeInfo.numOfResidAdvance = rs.getInt("NUM_OF_RESID_ADVANCED");

			location.timeDepInfoMap.put(timeInfo.year, timeInfo);
		}
		
		connection.close();
		return result;
	}
	
	public static Map<Integer, Area> getAreaInfo(int fromYear, int endYear) throws ClassNotFoundException, SQLException{
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement ps = connection.prepareStatement("select * from "+Constants.TABLE_AREA+" AS T1 INNER JOIN "+Constants.TABLE_AREA_TIME +" AS T2" +
				" ON T1.ID = T2.ID" +
				" AND YEAR >= ?" +
				" AND YEAR <= ?");
		ps.setInt(1, fromYear);
		ps.setInt(2, endYear);
		
		ResultSet rs = ps.executeQuery();
		
		Map<Integer,Area> result = new HashMap<Integer,Area>();
		while(rs.next()){
			int areaId = rs.getInt("ID");
			Area area = result.get(areaId);
			if(area == null){
				area = new Area();
				area.areaId = areaId;
				area.description = rs.getString("DESCR");
				area.type = rs.getInt("TYPE");
				result.put(areaId, area);
			}
			
			Area.AreaTimeInfo timeInfo = new Area.AreaTimeInfo();
			timeInfo.year = rs.getInt("YEAR");
			timeInfo.ratePerSquareMeter = rs.getDouble("RATE_BASE");
			timeInfo.numOfBank = rs.getInt("NUM_OF_BANKS");
			timeInfo.numOfBusstop = rs.getInt("NUM_OF_BUSSTOP");

			area.timeDepInfoMap.put(timeInfo.year, timeInfo);
		}
		
		connection.close();
		return result;
	}
	
	public static Map<Integer,Rental>  getRentalInfo(int areaId, int fromYear, int endYear) throws ClassNotFoundException, SQLException{
		
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement ps = connection.prepareStatement("select * from "+Constants.TABLE_RENTAL+" AS T1 INNER JOIN " + Constants.TABLE_RENTAL_TIME+ " AS T2" +
				" ON T1.RENT_ID = T2.RENT_ID" +
				" AND AREA_ID = ?" +
				" AND YEAR >= ?" +
				" AND YEAR <= ? " +
				" AND CAN_RENT = 1");
		ps.setInt(1, areaId);
		ps.setInt(2, fromYear);
		ps.setInt(3, endYear);
		ResultSet rs = ps.executeQuery();
		
		Map<Integer,Rental> result = new HashMap<Integer,Rental>();
		while(rs.next()){
			int rentId = rs.getInt("RENT_ID");
			Rental rental = result.get(rentId);
			if(rental == null){
				rental = new Rental();
				rental.rentId = rentId;
				rental.areaId = rs.getInt("AREA_ID");
				rental.description = rs.getString("DESCR");
				rental.latitude = rs.getDouble("LATITUDE");
				rental.longitude = rs.getDouble("LONGGITUDE");
				rental.squareMeter = rs.getDouble("SQUARE_METER");
				result.put(rentId, rental);
			}
			
			Rental.RentalTimeInfo timeInfo = new Rental.RentalTimeInfo();
			timeInfo.year = rs.getInt("YEAR");
			timeInfo.canRent = rs.getBoolean("CAN_RENT");
			timeInfo.rate = rs.getDouble("RATE");
			
			rental.timeDepInfoMap.put(timeInfo.year, timeInfo);
		}
		
		connection.close();
		return result;
	}
	
	public static Store updateStore(Store store, int fromYear, int endYear) throws SQLException, ClassNotFoundException{
		
		Connection connection = ConnectionHelper.getConnection();
		connection.setAutoCommit(false);
		
		PreparedStatement ps = connection.prepareStatement(
				"delete from " + Constants.TABLE_STORE + " where STORE_ID = ?");
		ps.setInt(1, store.storeId);
		ps.executeUpdate();
		
		ps = connection.prepareStatement(
				"delete from " + Constants.TABLE_STORE_TIME + " where STORE_ID = ? and year >= ? and year <= ?");
		ps.setInt(1, store.storeId);
		ps.setInt(2, fromYear);
		ps.setInt(3, endYear);
		ps.executeUpdate();
		
		if(store.storeId == 0){
			// generate new id
			int newId = 0;
			ps = connection.prepareStatement(
					"select max(STORE_ID) from " + Constants.TABLE_STORE);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				newId = rs.getInt(1) + 1;
			}
			store.storeId = newId;
		}
		
		ps = connection.prepareStatement(
				"insert into "+Constants.TABLE_STORE+" values(?,?,?)");
		ps.setInt(1, store.storeId);
		ps.setInt(2, store.rentId);
		ps.setString(3,store.description);
		ps.executeUpdate();
		
		ps = connection.prepareStatement(
				"insert into "+Constants.TABLE_STORE_TIME+" values(?,?,?,?,?,?,?,?,?,?,?,?,?)",ResultSet.TYPE_FORWARD_ONLY,ResultSet.CONCUR_READ_ONLY);  
		for(StoreTimeInfo storeTimeInfo : store.timeDepInfoMap.values()){
			ps.clearParameters();
			ps.setInt(1, store.storeId);
			ps.setInt(2, storeTimeInfo.year);
			ps.setInt(3, storeTimeInfo.competitor == true?1:0);
			ps.setDouble(4, 0.0);
			ps.setDouble(5, 0.0);
			ps.setDouble(6, 0.0);
			ps.setDouble(7, 0.0);
			ps.setDouble(8, storeTimeInfo.suppliers);
			ps.setDouble(9, storeTimeInfo.cosmeceuticals);
			ps.setDouble(10, storeTimeInfo.otc);
			ps.setDouble(11, storeTimeInfo.rx);
			ps.setInt(12, storeTimeInfo.medicare == true?1:0);
			ps.setInt(13, storeTimeInfo.numOfSales);
			
			ps.addBatch();
		}
		
		ps.executeBatch();
		connection.commit();
		connection.close();
		
		return store;
	}
	
	public static void deleteStore(int storeId) throws ClassNotFoundException, SQLException{
		Connection connection = ConnectionHelper.getConnection();
		connection.setAutoCommit(false);
		
		PreparedStatement ps = connection.prepareStatement(
				"delete from " + Constants.TABLE_STORE + " where STORE_ID = ?");
		ps.setInt(1, storeId);
		ps.executeUpdate();
		
		ps = connection.prepareStatement(
				"delete from " + Constants.TABLE_STORE_TIME + " where STORE_ID = ?");
		ps.setInt(1, storeId);
		ps.executeUpdate();
		
		connection.commit();
		connection.close();
	}
	
	public static Map<Integer,Store>  getStoreInfo(int areaId, int fromYear, int endYear) throws ClassNotFoundException, SQLException{
		
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement ps = connection.prepareStatement(
				"select * from "+Constants.TABLE_STORE+" AS T1 INNER JOIN " + Constants.TABLE_STORE_TIME+ " AS T2" +
				" ON T1.STORE_ID = T2.STORE_ID" +
				" AND YEAR >= ?" +
				" AND YEAR <= ? " +
				" WHERE RENT_ID IN (SELECT RENT_ID FROM "+Constants.TABLE_RENTAL+ " T1 WHERE AREA_ID = ?) ");
		
		ps.setInt(1, fromYear);
		ps.setInt(2, endYear);
		ps.setInt(3, areaId);
		ResultSet rs = ps.executeQuery();
		
		Map<Integer,Store> result = new HashMap<Integer,Store>();
		while(rs.next()){
			int storeId = rs.getInt("STORE_ID");
			Store store = result.get(storeId);
			if(store == null){
				store = new Store();
				store.storeId = storeId;
				store.rentId = rs.getInt("RENT_ID");;
				store.description = rs.getString("DESCR");
				result.put(storeId, store);
			}
			
			Store.StoreTimeInfo timeInfo = new Store.StoreTimeInfo();
			timeInfo.year = rs.getInt("YEAR");
			timeInfo.competitor = rs.getBoolean("IS_COMPETITOR");
			timeInfo.revenue = rs.getDouble("REVENUE");
			timeInfo.operationCost = rs.getDouble("OPERATION_COST");
			timeInfo.commodityCost = rs.getDouble("COMMODITY_COST");
			timeInfo.onetimeCost = rs.getDouble("ONETIME_COST");
			timeInfo.suppliers = rs.getDouble("SUPPLIERS");
			timeInfo.cosmeceuticals = rs.getDouble("COSMECEUTICALS");
			timeInfo.otc = rs.getDouble("OTC");
			timeInfo.rx = rs.getDouble("RX");
			timeInfo.medicare = rs.getBoolean("IS_MEDICARE");
			timeInfo.numOfSales = rs.getInt("NUM_OF_SALES");
			
			store.timeDepInfoMap.put(timeInfo.year, timeInfo);
		}
		
		connection.close();
		return result;
	}
	
	//public static
	
	public static List<LocationRentalDistance>  getLocationRentalDistanceInfo(int areaId) throws ClassNotFoundException, SQLException{
		
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement ps = connection.prepareStatement(
				"select * from "+Constants.TABLE_LOC_RENT_DISTANCE+" WHERE AREA_ID = ? "
				);
		
		
		ps.setInt(1, areaId);
		ResultSet rs = ps.executeQuery();
		
		List<LocationRentalDistance> result = new ArrayList<LocationRentalDistance> ();
		while(rs.next()){
			LocationRentalDistance locationRentalDistance = new LocationRentalDistance();
			locationRentalDistance.locationId = rs.getInt("LOCATION_ID");
			locationRentalDistance.rentId = rs.getInt("RENT_ID");
			locationRentalDistance.distance = rs.getDouble("WALK_DISTANCE");
			
			result.add(locationRentalDistance);
		}
		
		connection.close();
		return result;
	}
	
	public static void updateLocationRentalDistanceInfo(int areaId, List<LocationRentalDistance> distances) throws SQLException, ClassNotFoundException{
		Connection connection = ConnectionHelper.getConnection();
		PreparedStatement preparedStatement = null;
		preparedStatement = connection.prepareStatement("delete from "+Constants.TABLE_LOC_RENT_DISTANCE + " WHERE AREA_ID = ?");
		preparedStatement.setInt(1, areaId);
		preparedStatement.executeUpdate();
		preparedStatement.close();
		
		preparedStatement = connection.prepareStatement("insert into "+Constants.TABLE_LOC_RENT_DISTANCE + " values(?,?,?,?)",
				ResultSet.TYPE_FORWARD_ONLY,ResultSet.CONCUR_READ_ONLY);
		
		for(LocationRentalDistance distance : distances){
			preparedStatement.clearParameters();
			preparedStatement.setInt(1, areaId);
			preparedStatement.setInt(2, distance.locationId);
			preparedStatement.setInt(3, distance.rentId);
			preparedStatement.setDouble(4, distance.distance);
	        preparedStatement.addBatch();
		}
		
		preparedStatement.executeBatch();
		preparedStatement.close();
		connection.close();
	}
}
