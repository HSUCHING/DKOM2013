package gujing.pal;

import initial.ConnectionHelper;
import initial.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class MerPrediction {

	/**
	 * @param args
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		// TODO Auto-generated method stub
		
		
		double pal = execute(2000, 
				2013, 
				4,//AREA_TYPE
				6,// AREA_NUM_OF_SHOPPING_CENTER
				4,//AREA_NUM_OF_STORE,
				300,//SQUARE_METER, 
				10.26,//SUPPLIERS, 
				15.38,//COSMECEUTICALS, 
				62.82,//OTC, 
				11.54,//RX, 
				1, //IS_MEDICARE,
				4,//LOC_NUM_OF_SHOPPING_CENTER,
				2,//LOC_NUM_OF_OFFICE_BUILDING,
				1,//LOC_NUM_OF_HOSPITAL,
				11896,//LOC_NUM_OF_RESID_NORMAL, 
				1100, //LOC_NUM_OF_RESID_ADVANCED, 
				20,//LOC_NUM_OF_BUSSTOP,
				1 //LOC_NUM_OF_METRO
				);
		System.out.print(pal);
	}
	
	public static double execute(int historyDataFromYear,
			int YEAR,
			int AREA_TYPE,
			int AREA_NUM_OF_SHOPPING_CENTER,
			int AREA_NUM_OF_STORE,
			double SQUARE_METER,
			double SUPPLIERS ,
			double COSMECEUTICALS,
			double OTC ,
			double RX,
			int IS_MEDICARE,
			int LOC_NUM_OF_SHOPPING_CENTER ,
			int LOC_NUM_OF_OFFICE_BUILDING,
			int LOC_NUM_OF_HOSPITAL ,
			int LOC_NUM_OF_RESID_NORMAL ,
			int LOC_NUM_OF_RESID_ADVANCED ,
			int LOC_NUM_OF_BUSSTOP ,
			int LOC_NUM_OF_METRO){
		
		List<Double> aiList = null;
		try{
			Connection connection = ConnectionHelper.getConnection();
			aiList = getMultipleExponentialRegressionModel(historyDataFromYear, connection);
			connection.close();
		}
		catch(Exception e){
			throw new RuntimeException(e);
		}
		
		double exponential = aiList.get(1)*YEAR + aiList.get(2)*AREA_TYPE
				+ aiList.get(3)*AREA_NUM_OF_SHOPPING_CENTER + aiList.get(4)*AREA_NUM_OF_STORE + aiList.get(5)*SQUARE_METER
				+ aiList.get(6)*SUPPLIERS + aiList.get(7)*COSMECEUTICALS + aiList.get(8)*OTC
				+ aiList.get(9)*RX + aiList.get(10)*IS_MEDICARE + aiList.get(11)*LOC_NUM_OF_SHOPPING_CENTER
				+ aiList.get(12)*LOC_NUM_OF_OFFICE_BUILDING + aiList.get(13)*LOC_NUM_OF_HOSPITAL + aiList.get(14)*LOC_NUM_OF_RESID_NORMAL
				+ aiList.get(15)*LOC_NUM_OF_RESID_ADVANCED + aiList.get(16)*LOC_NUM_OF_BUSSTOP + aiList.get(17)*LOC_NUM_OF_METRO
				;
	
		return aiList.get(0) * Math.exp(exponential);
		
	}

	
	public static double execute(List<Double> aiList,
			int YEAR,
			int AREA_TYPE,
			int AREA_NUM_OF_SHOPPING_CENTER,
			int AREA_NUM_OF_STORE,
			double SQUARE_METER,
			double SUPPLIERS ,
			double COSMECEUTICALS,
			double OTC ,
			double RX,
			int IS_MEDICARE,
			int LOC_NUM_OF_SHOPPING_CENTER ,
			int LOC_NUM_OF_OFFICE_BUILDING,
			int LOC_NUM_OF_HOSPITAL ,
			int LOC_NUM_OF_RESID_NORMAL ,
			int LOC_NUM_OF_RESID_ADVANCED ,
			int LOC_NUM_OF_BUSSTOP ,
			int LOC_NUM_OF_METRO){
		
		
		double exponential = aiList.get(1)*YEAR + aiList.get(2)*AREA_TYPE
				+ aiList.get(3)*AREA_NUM_OF_SHOPPING_CENTER + aiList.get(4)*AREA_NUM_OF_STORE + aiList.get(5)*SQUARE_METER
				+ aiList.get(6)*SUPPLIERS + aiList.get(7)*COSMECEUTICALS + aiList.get(8)*OTC
				+ aiList.get(9)*RX + aiList.get(10)*IS_MEDICARE + aiList.get(11)*LOC_NUM_OF_SHOPPING_CENTER
				+ aiList.get(12)*LOC_NUM_OF_OFFICE_BUILDING + aiList.get(13)*LOC_NUM_OF_HOSPITAL + aiList.get(14)*LOC_NUM_OF_RESID_NORMAL
				+ aiList.get(15)*LOC_NUM_OF_RESID_ADVANCED + aiList.get(16)*LOC_NUM_OF_BUSSTOP + aiList.get(17)*LOC_NUM_OF_METRO
				;
	
		return aiList.get(0) * Math.exp(exponential);
		
	}
	
	public static List<Double> getMultipleExponentialRegressionModel(int historyDataFromYear){
		List<Double> aiList = null;
		try{
			Connection connection = ConnectionHelper.getConnection();
			aiList = getMultipleExponentialRegressionModel(historyDataFromYear, connection);
			connection.close();
		}
		catch(Exception e){
			throw new RuntimeException(e);
		}
		
		return aiList;
		
	}
	protected static List<Double> getMultipleExponentialRegressionModel(int historyDataFromYear, Connection connection) throws SQLException{
		
		Statement  st = connection.createStatement();
		st.executeUpdate("DELETE FROM "+Constants.TABLE_MER_FITTED);
		st.executeUpdate("DELETE FROM "+Constants.TABLE_MER_PAL_PMMLMODEL);
		st.executeUpdate("DELETE FROM "+Constants.TABLE_MER_RESULTS);
		st.executeUpdate("DELETE FROM "+Constants.TABLE_MER_SIGNIFICANCE);
		st.executeUpdate("DELETE FROM "+Constants.TABLE_MER_DATA);
		st.close();
		
		String insertDataSql = "INSERT INTO "+Constants.TABLE_MER_DATA+"  SELECT ID, REVENUE, YEAR,AREA_TYPE,AREA_NUM_OF_SHOPPING_CENTER"
		+ ",AREA_NUM_OF_STORE"
		+ ",SQUARE_METER"
		+ ",SUPPLIERS,COSMECEUTICALS,OTC,RX"
		+ ",IS_MEDICARE"
		+ ",LOC_NUM_OF_SHOPPING_CENTER, LOC_NUM_OF_OFFICE_BUILDING"
		+ ", LOC_NUM_OF_HOSPITAL,LOC_NUM_OF_RESID_NORMAL,LOC_NUM_OF_RESID_ADVANCED"
		+ ",LOC_NUM_OF_BUSSTOP,LOC_NUM_OF_METRO "
		+ "FROM REVENUE_TOTALS WHERE YEAR >= ?";
		
		
		PreparedStatement ps = connection.prepareStatement(insertDataSql);
		ps.setInt(1, historyDataFromYear);
		ps.executeUpdate();
		ps.close();
		
		// execute PAL
		String palSql = "CALL "+Constants.SP_MER+"("+Constants.TABLE_MER_DATA+","+ Constants.TABLE_MER_CONTROL+","+ Constants.TABLE_MER_RESULTS + "," + Constants.TABLE_MER_FITTED
				+ "," + Constants.TABLE_MER_SIGNIFICANCE + "," + Constants.TABLE_MER_PAL_PMMLMODEL + ") with overview";
		st = connection.createStatement();
		st.execute(palSql);
		st.close();
		
		// fetch result;
		st = connection.createStatement();
		ResultSet rs = st.executeQuery("SELECT * FROM " + Constants.TABLE_MER_RESULTS);
		
		List<Double> result = new ArrayList<Double>();
		while(rs.next()){
			result.add(rs.getDouble("Ai"));
		}
		return result;
		
	}
}
