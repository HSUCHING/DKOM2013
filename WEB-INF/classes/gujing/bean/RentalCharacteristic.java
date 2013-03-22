package gujing.bean;

import java.util.HashMap;
import java.util.Map;

public class RentalCharacteristic {

	public int rentId;
	
	public Map<Integer, RentalCharacteristicTimeInfo> timeDepInfoMap = new HashMap<Integer, RentalCharacteristicTimeInfo>();
	
	public static class RentalCharacteristicTimeInfo{
		public int year;
		public boolean advMetro;
		public boolean advHospital;
		public boolean advShopping;
		public boolean advLargeLiving;
		public boolean advLargeSquire;
		public boolean advLowRate;
		
		public boolean disShopping;
		public boolean disSmallLiving;
		public boolean disSmallSquire;
		public boolean disHighRate;
	}
	
}
