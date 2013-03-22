package gujing.bean;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

public class Area {

	public int areaId;
	public String description;
	public int type;
	
	public Map<Integer,AreaTimeInfo> timeDepInfoMap = new HashMap<Integer,AreaTimeInfo>();
	
	@XmlRootElement
	public static class AreaTimeInfo{
		public int year;
		public double ratePerSquareMeter;
		public int numOfBank;
		public int numOfBusstop;
		@Override
		public String toString() {
			return "AreaTimeInfo [year=" + year + ", ratePerSquareMeter="
					+ ratePerSquareMeter + ", numOfBank=" + numOfBank
					+ ", numOfBusstop=" + numOfBusstop + "]";
		}
		

		
	}

	@Override
	public String toString() {
		return "Area [areaId=" + areaId + ", description=" + description
				+ ", type=" + type + ", timeDepInfoMap=" + timeDepInfoMap + "]";
	}
	
	
}
