//impress
$(function () {

    var imp = impress();

    $('#arrowLeft').click(function (e) {
        imp.prev();
        e.preventDefault();
    });

    $('#arrowRight').click(function (e) {
        imp.next();
        e.preventDefault();
    });

});


function loadopenlayers_map(mappoint_array) {

    var mappoint = [];
    var marker;
    var lonlat_v;


    $.each(mappoint_array, function (idx, item) {
        console.log(idx + ":" + item);
        lonlat_v = new OpenLayers.LonLat(item.longitude, item.latitude).transform('EPSG:4326', map.getProjectionObject());
        marker = GetMark(lonlat_v, 20, 20, 'http://www.k1982.com/png/up/200905/20090513082309637.png',"drugstore_"+idx);
        markers.addMarker(marker);
        mappoint.push(marker);
    });

//    markers.addMarkers(mappoint);
    map.addLayer(markers);

    $.each(mappoint,function(idx,item){
        Magnetic.temppointarray.push(Magnetic.outZ({x:$("#"+item.icon.id).position().left+10,y:$("#"+item.icon.id).position().top+10}));

    });

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
                var jsonobjlocData_keys = Object.keys(jsonobjlocData);
                var locData_array = [];
                for (var i = 0; i < jsonobjlocData_keys.length; i++) {
                    var templocData = jsonobjlocData[jsonobjlocData_keys[i]];
                    locData_array.push(templocData);
                }
                console.log(locData_array);
                loadopenlayers_map(locData_array);
                $(".loadingcontainer").hide();
            },
            error:function () {
                alert("error");
                $(".loadingcontainer").hide();
            },
            beforeSend:function () {
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


window.onload = function () {
    $('.cd-dropdown>ul').children().click(
        function () {
            $(this).parent().parent().animate({
                opacity:0.8,
                right:'200'
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
                    right:'0'
                }, 1000, "swing", function () {
                    $('#buttonContainer').fadeIn(1000, 'swing');
                });
            });
            $('#buttonContainer').click(function () {
                alert("click");
            });
        }
    );

    //meny navi:ul>li
    $('.meny ul li').click(function(){
        $('#maincontent').animate({scrollTop:$($(this).children().attr('href')).offset().top},500,false);
    });
};



