package gujing.bean;

import java.util.HashMap;
import java.util.Map;

public class Rental {
	public int rentId;
	public int areaId;
	public String description;
	public double latitude;
	public double longitude;
	public double squareMeter;
	
	public Map<Integer,RentalTimeInfo> timeDepInfoMap = new HashMap<Integer,RentalTimeInfo>();
	
	public static class RentalTimeInfo{
		public int year;
		public boolean canRent;
		public double rate;
		@Override
		public String toString() {
			return "RentalTimeInfo [year=" + year + ", canRent=" + canRent
					+ ", rate=" + rate + "]";
		}
		
		
	}

	@Override
	public String toString() {
		return "Rental [rentId=" + rentId + ", areaId=" + areaId
				+ ", description=" + description + ", latitude=" + latitude
				+ ", longitude=" + longitude + ", squareMeter=" + squareMeter
				+ ", timeDepInfoMap=" + timeDepInfoMap + "]";
	}

	
	
}
