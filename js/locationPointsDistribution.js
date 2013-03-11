/**
 * Created with JetBrains WebStorm.
 * User: I068959
 * Date: 3/11/13
 * Time: 1:26 PM
 * To change this template use File | Settings | File Templates.
 */

function StoreLocationDistance(storeId, locationId, distance) {
    this.storeId = storeId;
    this.locationId = locationId;
    this.distance = distance;
}

function StoreRevenue(storeId, revenue) {
    this.storeId = storeId;
    this.revenue = revenue;
}
function StoreWeight() {
    this.storeId;
    this.weight;
}
function LocationStoreWeight() {
    this.locationId;
    this.storeWeights = [];
}

function generateLocationStoreWeights(storeLocationDistances, storeRevenues) {
    // result
    var result = [];

    // process revenue percentage
    var allRevenue = 0;
    for (var i = 0; i < storeRevenues.length; i++) {
        allRevenue += storeRevenues[i].revenue;
    }

    for (var i = 0; i < storeRevenues.length; i++) {
        var storeRevenue = storeRevenues[i];
        var revenuePercentage = storeRevenue.revenue / allRevenue;

        for (var j = 0; j < storeLocationDistances.length; j++) {
            storeLocationDistance = storeLocationDistances[j];
            if (storeLocationDistance.storeId == storeRevenue.storeId) {
                var locationStoreWeight = null;
                for (var x = 0; x < result.length; x++) {
                    if (result[x].locationId == storeLocationDistance.locationId) {
                        locationStoreWeight = result[x];
                    }
                }
                if (locationStoreWeight == null) {
                    locationStoreWeight = new LocationStoreWeight();
                    locationStoreWeight.locationId = storeLocationDistance.locationId;
                    result.push(locationStoreWeight);
                }

                var storeWeight = new StoreWeight();
                storeWeight.storeId = storeLocationDistance.storeId;

                storeWeight.weight = revenuePercentage / storeLocationDistance.distance;

                locationStoreWeight.storeWeights.push(storeWeight);
            }
        }
    }


    // normalization
    for (var i = 0; i < result.length; i++) {
        var totalWeight = 0;
        for (var j = 0; j < result[i].storeWeights.length; j++) {
            totalWeight += result[i].storeWeights[j].weight;
        }
        for (var j = 0; j < result[i].storeWeights.length; j++) {
            result[i].storeWeights[j].weight = result[i].storeWeights[j].weight / totalWeight;
        }
    }
    return result;
}

