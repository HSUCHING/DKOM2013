package gujing.bean;

import java.util.HashMap;
import java.util.Map;

public class Store {
	public int storeId;
	public int rentId;
	public String description;

	public Map<Integer,StoreTimeInfo> timeDepInfoMap = new HashMap<Integer,StoreTimeInfo>();
	
	public static class StoreTimeInfo{
		public int year;
		public boolean competitor;
		public double revenue;
		public double operationCost;
		public double commodityCost;
		public double onetimeCost;
		public double suppliers;
		public double cosmeceuticals;
		public double otc;
		public double rx;
		public boolean medicare;
		public int numOfSales;
		@Override
		public String toString() {
			return "StoreTimeInfo [year=" + year + ", competitor=" + competitor
					+ ", revenue=" + revenue + ", operationCost="
					+ operationCost + ", commodityCost=" + commodityCost
					+ ", onetimeCost=" + onetimeCost + ", suppliers="
					+ suppliers + ", cosmeceuticals=" + cosmeceuticals
					+ ", otc=" + otc + ", rx=" + rx + ", medicare=" + medicare
					+ ", numOfSales=" + numOfSales + "]";
		}
		
		
		
	}

	@Override
	public String toString() {
		return "Store [rentId=" + rentId + ", description=" + description + "]";
	}
	
	
}
