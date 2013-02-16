/**
 * Created with JetBrains WebStorm.
 * User: CuiJun
 * Date: 13-2-16
 * Time: 上午10:55
 * To change this template use File | Settings | File Templates.
 */
map = new OpenLayers.Map("mapdiv",{
    maxResolution:'auto',
    maxExtent: new OpenLayers.Bounds( -128 * 156543.03390625, -128 * 156543.03390625, 128 * 156543.03390625, 128 * 156543.03390625 ),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    projection:new OpenLayers.Projection("EPSG:900913"),
    center:new OpenLayers.LonLat(121.51691,31.22834).transform('EPSG:4326', 'EPSG:900913'),
    controls: []
});

var navigation_control = new OpenLayers.Control.Navigation({});
var panzoombar_control=new OpenLayers.Control.PanZoomBar({});
//    var permalink_control=new OpenLayers.Control.Permalink();
var gmapstreetLayer = new OpenLayers.Layer.Google("Google Street",{numZoomLevels: 18});
var gmaphybridLayer = new OpenLayers.Layer.Google("Google HYBRID",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 18});
var gmapterrainLayer = new OpenLayers.Layer.Google("Google TERRAIN",{type: google.maps.MapTypeId.TERRAIN,numZoomLevels: 18});
var gmapsatelliteLayer = new OpenLayers.Layer.Google("Google SATELLITE",{type: google.maps.MapTypeId.SATELLITE,numZoomLevels: 18});


map.addLayers([gmapstreetLayer,gmaphybridLayer,gmapterrainLayer,gmapsatelliteLayer]);
//    map.addLayer(gmapstreetLayer);

//    map addControl
//    map.addControl(navigation_control);
//    map.addControl(panzoombar_control);
//    map.addControl(permalink_control);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.addControl(new OpenLayers.Control.MousePosition());
//    map.addControl(new OpenLayers.Control.OverviewMap());

//    map removeControl
//    map.removeControl(panzoombar_control);


//    add marker layer

function GetMark(lonlat,w,h,statusImg){
    var size = new OpenLayers.Size(w,h);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon=new OpenLayers.Icon('img/drugstore.png',size,offset,"drugstore");
    return new OpenLayers.Marker(lonlat,icon);
}

var lonlat_v=new OpenLayers.LonLat(121.51691,31.22834).transform('EPSG:4326', map.getProjectionObject());

var marker=GetMark(lonlat_v,20,20,'http://www.k1982.com/png/up/200905/20090513082309637.png');
markers=new OpenLayers.Layer.Markers( "Markers");
markers.addMarker(marker);
map.addLayer(markers);

function removeAllPopup(){//移除标记信息

    var len =map.popups.length;
    for(var i=len-1;i>=0;i--){
        map.removePopup(map.popups[i]);
    }
}

var markerClickMouseDown = function(evt){
    removeAllPopup();
    OpenLayers.Event.stop(evt);
    popup = new OpenLayers.Popup(""+lonlat_v.lon + ""+ lonlat_v.lat,
        lonlat_v,
        new OpenLayers.Size(100,100),
        "<div id='example'>"+this.id+"<div>",
        true);
    popup.setBackgroundColor("black");
    // popup.setOpacity(0.1);
    //popup.autoSize=true;
    map.addPopup(popup);
};
marker.events.register("mousedown", marker, markerClickMouseDown);

$("#button").click(function(){
    $("#drugstore").animate({
        left:[ "+=50", "swing" ],
        top:["+=50","swing"],
        opacity : [ 0.25, "linear" ]
    },1000);
});
