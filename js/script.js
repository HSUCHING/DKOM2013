//loadmap

var mappoint = {};
mappoint.location = [];
mappoint.rental = [];
mappoint.store = [];
mappoint.lcarray = [];
mappoint.rtarray = [];
mappoint.starray = [];

function simulateMagnetic() {
    if ($.inArray("locationId", Object.keys(mappoint.lcarray[0])) >= 0) {

        $.each(mappoint.location, function (idx, item) {
            var m_point = mappoint.lcarray[idx];
            var magnetic_obj = {};
            magnetic_obj.id = m_point.locationId;
            magnetic_obj.array = [];
            for (var i = 0; i < m_point.timeDepInfoMap[Object.keys(m_point.timeDepInfoMap)[0]].scale; i++) {
                magnetic_obj.array.push(Magnetic.outZ({x:$("#" + item.icon.id).position().left + 10 + i * 3, y:$("#" + item.icon.id).position().top + 10 + i * 3, name:'location' + m_point.locationId}));
            }
            Magnetic.temppointarray.location.push(magnetic_obj);
        });
    }

    if ($.inArray("rentId", Object.keys(mappoint.rtarray[0])) >= 0) {
        $.each(mappoint.rental, function (idx, item) {
            var m_point = mappoint.rtarray[idx];
            var magnetic_obj = {};
            magnetic_obj.id = m_point.rentId;
            magnetic_obj.array = [];
            magnetic_obj.array.push(Magnetic.outZ({x:$("#" + item.icon.id).position().left + 10, y:$("#" + item.icon.id).position().top + 10, name:'rental' + m_point.rentId}));

//            var button = $('<button class="rent_button"/>',
//                {
//                    text: 'Test',
//
//                    click: function () {
//
//                        alert('hi'); }
//                })
//
//            $('#bdid').appendChild(button);

            Magnetic.temppointarray.rental.push(magnetic_obj);


        });
    }

    if ($.inArray("storeId", Object.keys(mappoint.starray[0])) >= 0) {
        $.each(mappoint.store, function (idx, item) {
            var m_point = mappoint.starray[idx];
            var magnetic_obj = {};
            magnetic_obj.id = m_point.storeId;
            magnetic_obj.array = [];
            magnetic_obj.array.push(
                {
                    x:$("#" + item.icon.id).position().left + 10,
                    y:$("#" + item.icon.id).position().top + 10,
                    name:'store' + m_point.storeId
                }
            );

//            magnetic_obj.array.push(Magnetic.outZ({x:$("#" + item.icon.id).position().left + 10, y:$("#" + item.icon.id).position().top + 10, name:'store' + m_point.storeId}));
            Magnetic.temppointarray.store.push(magnetic_obj);
        });
    }


    console.log(Magnetic.temppointarray);
}


function loadopenlayers_map(mappoint_array) {


    var marker;
    var lonlat_v;


    $.each(mappoint_array, function (idx, item) {
        lonlat_v = new OpenLayers.LonLat(item.longitude, item.latitude).transform('EPSG:4326', map.getProjectionObject());
        if ($.inArray("locationId", Object.keys(item)) >= 0) {
            if (item.type == 1) {
                marker = GetMark(lonlat_v, 30, 30, 'img/icon_house.png', "location_" + idx);
            } else if (item.type == 2) {
                marker = GetMark(lonlat_v, 30, 30, 'img/icon_mall.png', "location_" + idx);
            } else if (item.type == 3) {
                marker = GetMark(lonlat_v, 30, 30, 'img/icon_work.png', "location_" + idx);
            } else if (item.type == 4) {
                marker = GetMark(lonlat_v, 30, 30, 'img/icon_metro.png', "location_" + idx);
            } else {
                marker = GetMark(lonlat_v, 30, 30, 'img/icon_hospital.png', "location_" + idx);
            }
            mappoint.location.push(marker);
        } else if ($.inArray("storeId", Object.keys(item)) >= 0) {
            marker = GetMark(lonlat_v, 30, 30, 'img/icon_store.png', "store_" + idx);
            mappoint.store.push(marker);
        } else {
            marker = GetMark(lonlat_v, 30, 30, 'img/icon_rent.png', "rent_" + idx);
            mappoint.rental.push(marker);
        }
        markers.addMarker(marker);
    });
    map.addLayer(markers);
}


var distance_allarray = [];
function calculateDistance(originPlace, destPlace) {
//    var directionsService = new google.maps.DirectionsService();


    if (distance_allarray.length == 0) {
        distance_allarray = [];
//    var temdistance = {};
//    var route;

// DirectionsRequest
        var origins = [];
        var destinations = [];

        $.each(originPlace, function (oridx, oritem) {
            origins.push(new google.maps.LatLng(oritem.latitude, oritem.longitude));
        });
        $.each(destPlace, function (deidx, deitem) {
            destinations.push(new google.maps.LatLng(deitem.latitude, deitem.longitude));
        });


        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins:origins,
                destinations:destinations,
                travelMode:google.maps.TravelMode.WALKING,
                avoidHighways:false,
                avoidTolls:false,
                unitSystem:google.maps.UnitSystem.METRIC
            }, function (response, status) {
                $.each(originPlace, function (oridx, oritem) {
                    $.each(destPlace, function (deidx, deitem) {
                        var temdistance = {
                            "locationId":deitem.locationId,
                            "rentId":oritem.rentId,
                            "distance":response.rows[oridx].elements[deidx].distance.value
                        };
                        distance_allarray.push(temdistance);
                    });
                });
                console.log(distance_allarray);

                $.ajax({

                    url:'rest/gujing/updateDistances?areaId=' + areaId,

                    type:'post',

                    dataType:'json',

                    contentType:'application/json;charset=utf-8',

                    data:JSON.stringify(distance_allarray),

                    success:function () {


                    },

                    error:function () {

                        alert("Error during update distance!");

                    }

                });

            });


//    $.each(originPlace, function (oridx, oritem) {
//        $.each(destPlace, function (deidx, deitem) {
//            // DirectionsRequest
////            route = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(oritem.latitude, oritem.longitude), new google.maps.LatLng(deitem.latitude, deitem.longitude));
////            temdistance = {
////                "locationId":deitem.locationId,
////                "rentId":oritem.rentId,
////                "distance":route
////            };
////            distance_allarray.push(temdistance);
//            var requestdistance = {
//                origin:new google.maps.LatLng(oritem.latitude, oritem.longitude), // 起點
//                destination:new google.maps.LatLng(deitem.latitude, deitem.longitude), // 終點
//                waypoints:[],
//                optimizeWaypoints:true, // 路線最佳化
//                travelMode:google.maps.TravelMode.WALKING // 交通模式，目前有 開車/步行 以及腳踏車(僅限美國) 三種路線規劃
//            };
//            directionsService.route(requestdistance, function (response, status) {
//                if (status == google.maps.DirectionsStatus.OK) {
//                    route = response.routes[0];
//                    // 取得距離
//                    temdistance = {
//                        "locationId":deitem.locationId,
//                        "rentId":oritem.rentId,
//                        "distance":route.legs[0].distance.text
//                    };
//                    distance_allarray.push(temdistance);
//                    console.log(oridx+":"+deidx);
//                    if (oridx == (originPlace.length - 1) && deidx == (destPlace.length - 1)) {
//                        console.log(distance_allarray);
//                    }
//                    // 取得從起點至終點的大約時間
////                    console.log(route.legs[0].duration.text);
//                }
//            });
//        })
//    });
    }
}

transferobj = {};

variable = 0;
function initialData(year, areaId) {
    markers.clearMarkers();

    if (variable != 0) {
        $.ajax({
            url:'rest/gujing/init?areaId=' + areaId + '&fromYear=2013&toYear=' + year + '&getLocations=true&getRentals=true&getStores=true&getDistances=true&getRentalCharacteristic=true',
            type:'get',
            dataType:'json',
            success:function (jsonobj) {
                transferobj.initialobj = {};
                transferobj.initialobj = jsonobj;
                var jsonobj_keys = Object.keys(jsonobj);
                var jsonobjlocData = jsonobj[jsonobj_keys[1]];
                var jsonobjrentData = jsonobj[jsonobj_keys[2]];
                var jsonobjstoreData = jsonobj[jsonobj_keys[3]];
                var jsonobjlocData_keys = Object.keys(jsonobjlocData);
                var jsonobjrentData_keys = Object.keys(jsonobjrentData);
                var jsonobjstoreData_keys = Object.keys(jsonobjstoreData);
                var locData_array = [];
                var rentData_array = [];
                var storeData_array = [];
                for (var i = 0; i < jsonobjlocData_keys.length; i++) {
                    var templocData = jsonobjlocData[jsonobjlocData_keys[i]];
                    locData_array.push(templocData);
                }
                for (var i = 0; i < jsonobjrentData_keys.length; i++) {
                    var temprentData = jsonobjrentData[jsonobjrentData_keys[i]];
                    for (var j = 0; j < jsonobjstoreData_keys.length; j++) {
                        var tempstoreData = jsonobjstoreData[jsonobjstoreData_keys[j]];
                        if (tempstoreData.rentId == temprentData.rentId) {
                            tempstoreData.latitude = temprentData.latitude;
                            tempstoreData.longitude = temprentData.longitude;
                            storeData_array.push(tempstoreData);
                        }
                    }
                    rentData_array.push(temprentData);
                }

                calculateDistance(rentData_array, locData_array);

                mappoint = {};
                mappoint.lcarray = [];
                mappoint.rtarray = [];
                mappoint.starray = [];
                mappoint.location = [];
                mappoint.rental = [];
                mappoint.store = [];


                mappoint.lcarray = locData_array;
                mappoint.rtarray = rentData_array;
                mappoint.starray = storeData_array;

                loadopenlayers_map(locData_array);
                loadopenlayers_map(rentData_array);
                loadopenlayers_map(storeData_array);
                jumpsections = {"#photo":$('#photo').offset().top, "#contact":$('#contact').offset().top};
                $(".loadingcontainer").hide();
            },
            error:function () {
                alert("error");
                $(".loadingcontainer").hide();
            },
            beforeSend:function () {
                $(".loadingcontainer").show("fast");
            }
        });
    }
    variable = 1;

}


//ajax httprequest
$("#buttonContainer").click(function () {
    $("#timeline").fadeOut();
    $('#world').css({"z-index":2000});
    $('#world').animate({"opacity":0.2}, 200, 'swing');
    simulateMagnetic();
    freshDataRevenues(1);
});


//makisu

$(function () {
    $('#cd-dropdown').dropdown({
        gutter:5,
        delay:100,
        random:true
    });
});

if ($.fn.makisu.enabled) {
    var $maki = $('.maki');
    // Create Makisus
    $maki.makisu({
        selector:'dd',
        overlap:0.6,
        speed:0.8
    });
    // Open all

//        $( '.maki' ).makisu( 'open' );

    // Toggle on click
    $('.toggle').on('click', function () {
        $('.maki').makisu('toggle');
    });

    // Disable all links
    $('.demo a').click(function (event) {
        event.preventDefault();
    });
} else {

    $('.warning').show();
}


var pp = $('#push').pointPoint();
var areaId;

jumpsections = {"photo":0, "contact":0};

window.onload = function () {
    $('.cd-dropdown>ul').children().click(
        function () {
            $(this).parent().parent().animate({
                opacity:0.6,
                marginLeft:'-200px'
            }, 1000, "swing", function () {
//                    $('.dropdownlistNaviTwo').animate({right:'150'},1000,function(){
                $('.dropdownlistNaviTwo').fadeIn(2500, 'swing', function () {
                    $('.maki').makisu('open');
                });
            });
            console.log($(this).attr("data-value"));
        }
    );
    $('.dropdownlistNaviTwo dd').click(
        function () {
            if ($(this).children()[0].attributes.item().value == "YiHan") {
                areaId = 1;
            }
            $(".btn-slide").trigger("click");
            $('.dropdownlistNaviTwo').fadeOut(2000, 'swing', function () {
                $('.cd-dropdown').animate({
                    opacity:1.0,
                    marginLeft:'0px'
                }, 1000, "swing", function () {
                    $('#maparea').animate({"opacity":1.0}, 500, 'swing');
                    $('#buttonContainer').fadeIn(1000, 'swing');
                    $("#timeline").fadeIn(1000, 'swing');
                });
            });
        }
    );


    $('.meny ul li').click(function () {
        this_jumptemp = $(this);
//        $('#maincontent').animate({scrollTop:$("#maincontent").scrollTop()+$($(this).children().attr('href')).offset().top},500,false);
        $('#maincontent').animate(
            {
                scrolltop:jumpsections[$(this).children().attr('href')] - 20
            },
            800,
            'swing'
//            aa
//            function(){console.log("aa");jumpsections[this_jumptemp.children().attr('href')]=jumpsections[this_jumptemp.children().attr('href')]-$("#maincontent").scrollTop()}
        );
    });
};


//menutop

$(".btn-slide").click(function () {
    $("#menuToppanel").slideToggle("slow");
    $(this).toggleClass("active");
    return false;
});

tempclick = 70;
$("#admininfo").click(function () {

    if (tempclick == 55) {
        $("#infocard").animate({top:tempclick}, {
            duration:800
        });
    }
    $("#infocard").fadeToggle(1000, 'linear');
    if (tempclick == 70) {
        $("#infocard").animate({top:tempclick}, {
            duration:800
        });
    }
    (tempclick == 70) ? (tempclick = 55) : (tempclick = 70);
});


function animatemagnetic(storeLocationDistances, storeRevenues) {

    var analysis_data = generateLocationStoreWeights(storeLocationDistances, storeRevenues);
    $.each(Magnetic.temppointarray.location, function (mtlidx, mtlitem) {
        $.each(analysis_data, function (adidx, aditem) {
            if (mtlitem.id == aditem.locationId) {
                $.each(aditem.storeWeights, function (asdidx, asditem) {
                    $.each(Magnetic.temppointarray.rental, function (mtridx, mtritem) {
                        if (asditem.storeId == mtritem.id) {
                            var x_position = mtlitem.array[asdidx].position.x;
                            var y_position = mtlitem.array[asdidx].position.y;
                            var i = 0;
                            var time_animate = setInterval(function () {
                                mtlitem.array[asdidx].position.x += (mtritem.array[0].position.x - x_position) / 1000;
                                mtlitem.array[asdidx].position.y += (mtritem.array[0].position.y - y_position) / 1000;
                                i++;
                                if (i == 1000) {
                                    clearInterval(time_animate);
                                }
                            }, 50);

//                                            mtlitem.array[asdidx].position.x = mtritem.array[0].position.x;
//                                            mtlitem.array[asdidx].position.y = mtritem.array[0].position.y;
                        }
                    });
                });
            }
        });
    });

}


var storeLocationDistances = [];
var initial_fresh = true;
function freshDataStore(storeRevenues, newstoreinfo) {

//    标示新增还是初始化
    if (newstoreinfo == null) {
//        $.ajax({
//            url:'../DKOM2013/json/fresh.json',
//            type:'post',
//            dataType:'json',
//            success:function (jsonobjanalysisstore) {
        storeLocationDistances = [];
//                var jsonobjaystore_keys = Object.keys(jsonobjanalysisstore["storeData"]);

        var jsonobjaystore_keys = Object.keys(transferobj.initialobj["storeData"]);
        for (var i = 0; i < jsonobjaystore_keys.length; i++) {
            var jsonobjaystoreData = transferobj.initialobj["storeData"][jsonobjaystore_keys[i]];
            $.each(distance_allarray, function (idx, item) {
                if (jsonobjaystoreData.rentId == item.rentId) {
                    var storeloData = {};
                    storeloData.storeId = jsonobjaystoreData.storeId;
                    storeloData.locationId = item.locationId;
                    storeloData.distance = item.distance;
                    storeLocationDistances.push(storeloData);
                }
            });
        }
//                    console.log(storeLocationDistances);
        animatemagnetic(storeLocationDistances, storeRevenues);
//            }
//        });
    } else {
//        if (initial_fresh == false) {
////            var temp=storeLocationDistances.pop();
//
//        }
        $.each(distance_allarray, function (idx, item) {
            if (newstoreinfo.rentId == item.rentId) {
                var storeloData = {};
                storeloData.storeId = newstoreinfo.storeId;
                storeloData.locationId = item.locationId;
                storeloData.distance = item.distance;
                storeLocationDistances.push(storeloData);
            }
        });

        transferobj.initialobj["storeData"][newstoreinfo.storeId] = newstoreinfo;
        initial_fresh = false;
        animatemagnetic(storeLocationDistances, storeRevenues);
    }
}


function freshDataRevenues(a, newstoreinfo) {
    $.ajax({
        url:'rest/gujing/doPrediction?type=1&areaId=' + areaId + '&fromYear=2013&toYear=' + year,
        type:'get',
        dataType:'json',
        success:function (jsonobjanalysis) {
            transferobj.animateobj = {};
            transferobj.animateobj = jsonobjanalysis;
            var storeRevenues = [];
            var jsonobjay_keys = Object.keys(jsonobjanalysis);
            for (var i = 0; i < jsonobjay_keys.length; i++) {
                var storeReData = {};
                var jsonobjayData = jsonobjanalysis[jsonobjay_keys[i]];
                storeReData.storeId = jsonobjayData.storeId;
                var jsonobjay_keys_ykeys = Object.keys(jsonobjayData.timeDepInfoMap);
                storeReData.revenue = 0;
                for (var j = 0; j < jsonobjay_keys_ykeys.length; j++) {
                    storeReData.revenue += jsonobjayData.timeDepInfoMap[jsonobjay_keys_ykeys[j]].revenue;
                }
                storeReData.revenue = storeReData.revenue / jsonobjay_keys_ykeys.length;
                storeRevenues.push(storeReData);
            }

//b:获得新增的rentid与storeid

            freshDataStore(storeRevenues, newstoreinfo);

            console.log(storeRevenues);
        }
    });
}


function reloadstore(storeLocationDistances, storeRevenues) {
    animatemagnetic(storeLocationDistances, storeRevenues);
}


$("#rent_100").click(function () {
    press(this);
});

$("#rent_101").click(function () {
    press(this);
});

$("#rent_102").click(function () {
    press(this);
});


$("#rent_103").click(function () {
    press(this);
});


$("#rent_104").click(function () {
    press(this);
});


function press(obj) {
    openDialog();
    var rentId = obj.id.substring(5, obj.id.length);
    var storeId = 0;
    $.each(transferobj.initialobj["storeData"], function (idx, item) {
        if (rentId == item.rentId) {
            storeId = item.storeId;
        }
    });

    readJSON(storeId, rentId, year);
}