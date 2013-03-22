package gujing.bean;

import java.util.HashMap;
import java.util.Map;

public class StoreRevenueCost {
	public int storeId;
	
	public Map<Integer, StoreRevenueCostTimeInfo> timeDepInfoMap = new HashMap<Integer, StoreRevenueCostTimeInfo>();
	
	
	public static class StoreRevenueCostTimeInfo{
		public int year;
		public double revenue;
		public double cost;
		@Override
		public String toString() {
			return "StoreRevenueCostTimeInfo [year=" + year + ", revenue="
					+ revenue + ", cost=" + cost + "]";
		}
		
	}


	@Override
	public String toString() {
		return "StoreRevenueCost [storeId=" + storeId + ", timeDepInfoMap="
				+ timeDepInfoMap + "]";
	}
	
	
}
