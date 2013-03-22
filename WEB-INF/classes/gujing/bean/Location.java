package gujing.bean;

import java.util.HashMap;
import java.util.Map;

public class Location {

	public int locationId;
	public int areaId;
	public String description;
	public int type;
	public double latitude;
	public double longitude;
	public Map<Integer,LocationTimeInfo> timeDepInfoMap = new HashMap<Integer,LocationTimeInfo>();
	@Override
	public String toString() {
		return "Location [id=" + locationId + ", areaId=" + areaId + ", description="
				+ description + ", type=" + type + ", latitude=" + latitude
				+ ", longitude=" + longitude + "]";
	}

	public static class LocationTimeInfo{
		public int id;
		public int year;
		public int scale;
		public int spendingPower;
		public int numOfResidNormal;
		public int numOfResidAdvance
		;
		@Override
		public String toString() {
			return "LocationTimeInfo [id=" + id + ", year=" + year + ", scale="
					+ scale + ", spendingPower=" + spendingPower
					+ ", numOfResidNormal=" + numOfResidNormal
					+ ", numOfResidAdvance=" + numOfResidAdvance + "]";
		}
	}
}
