//loadmap
function loadopenlayers_map(mappoint_array) {

    var mappoint = [];
    var marker;
    var lonlat_v;


    $.each(mappoint_array, function (idx, item) {
        lonlat_v = new OpenLayers.LonLat(item.longitude, item.latitude).transform('EPSG:4326', map.getProjectionObject());
        marker = GetMark(lonlat_v, 20, 20, 'http://www.k1982.com/png/up/200905/20090513082309637.png', "drugstore_" + idx);
        markers.addMarker(marker);
        mappoint.push(marker);
    });

//    markers.addMarkers(mappoint);
    map.addLayer(markers);
    $.each(mappoint, function (idx, item) {
        Magnetic.temppointarray.push(Magnetic.outZ({x:$("#" + item.icon.id).position().left + 10, y:$("#" + item.icon.id).position().top + 10,name:'jk'}));
    });
    console.log(Magnetic.temppointarray);
}


function calculateDistance(originPlace, destPlace) {
//    var directionsService = new google.maps.DirectionsService();
    var distance_allarray = [];
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
            avoidTolls:false
        }, function (response, status) {
            $.each(originPlace, function (oridx, oritem) {
                $.each(destPlace, function (deidx, deitem) {
                    var temdistance = {
                        "locationId":deitem.locationId,
                        "rentId":oritem.rentId,
                        "distance":response.rows[oridx].elements[deidx].distance.text
                    };
                    distance_allarray.push(temdistance);
                });
            });
            console.log(distance_allarray);
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
    console.log(distance_allarray);
}

//ajax httprequest
$("#buttonContainer").click(function () {
        $.ajax({
            url:'../DKOM2013/json/demo.json',
            type:'post',
            dataType:'json',
            success:function (jsonobj) {
                var jsonobj_keys = Object.keys(jsonobj);
                var jsonobjlocData = jsonobj[jsonobj_keys[1]];
                var jsonobjrentData = jsonobj[jsonobj_keys[2]];
                var jsonobjlocData_keys = Object.keys(jsonobjlocData);
                var jsonobjrentData_keys = Object.keys(jsonobjrentData);
                var locData_array = [];
                var rentData_array = [];
                for (var i = 0; i < jsonobjlocData_keys.length; i++) {
                    var templocData = jsonobjlocData[jsonobjlocData_keys[i]];
                    locData_array.push(templocData);
                }
                for (var i = 0; i < jsonobjrentData_keys.length; i++) {
                    var templocData = jsonobjrentData[jsonobjrentData_keys[i]];
                    rentData_array.push(templocData);
                }

                calculateDistance(rentData_array, locData_array);

                console.log(locData_array);
                loadopenlayers_map(locData_array);
                jumpsections = {"#photo":$('#photo').offset().top, "#contact":$('#contact').offset().top};
                $(".loadingcontainer").hide();
            },
            error:function () {
                alert("error");
                $(".loadingcontainer").hide();
            },
            beforeSend:function () {
                $('#world').css({"z-index":2000});
                $('#world').animate({"opacity":0.5}, 500, 'swing');
                $(".loadingcontainer").show();
            }
        });
    }
);


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
            console.log($(this).children()[0].attributes.item().value);
            $('.dropdownlistNaviTwo').fadeOut(2000, 'swing', function () {
                $('.cd-dropdown').animate({
                    opacity:1.0,
                    marginLeft:'0px'
                }, 1000, "swing", function () {
                    $('#maparea').animate({"opacity":1.0}, 500, 'swing');
                    $('#buttonContainer').fadeIn(1000, 'swing');
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