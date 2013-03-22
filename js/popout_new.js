//$(function(){
//
//    var imp = impress();
//
//    $('#arrowLeft').click(function(e){
//        imp.prev();
//        e.preventDefault();
//    });
//
//    $('#arrowRight').click(function(e){
//        imp.next();
//        e.preventDefault();
//    });
//
//});
var store_data = [];
var rent_data = [];
var char_data = [];

//function rentMode(){
//    document.getElementById("rent_info").display = "";
//    document.getElementById("rent_wrapper").display ="";
//    document.getElementById("store_info").display = "none";
//    document.getElementById("store_wrapper").diplay = "none";
//    document.getElementById("column").diplay = "none";
//}
//function storeMode(){
//    document.getElementById("rent_info").display = "none";
//    document.getElementById("rent_wrapper").display ="none";
//    document.getElementById("store_info").display = "";
//    document.getElementById("store_wrapper").diplay = "";
//    document.getElementById("column").diplay = "";
//}

$(function readJSON(storeId, rentId, toYear)
{


    storeId = 101;
    rentId = 101;
    toYear = 2016;
    var elementPrice = "";
    var elementCompchek = "";
    var elementMedcheck = "";

    if (storeId == 0) {
        var mydiv = document.getElementById("column");
        mydiv.parentNode.removeChild(mydiv);
        document.getElementById("rent_info").style.display = "block";
        document.getElementById("rent_wrapper").style.display = "block";
        document.getElementById("store_info").style.display = "none";
        document.getElementById("store_wrapper").style.display = "none";
//        document.getElementById("column").style.display = "none";
        elementPrice = "rent_price";
        elementCompchek = "rent_checkcomp";
        elementMedcheck = "rent_checkmed";
    }
    else {
        document.getElementById("rent_info").style.display = "none";
        document.getElementById("rent_wrapper").style.display = "none";
        document.getElementById("store_info").style.display = "block";
        document.getElementById("store_wrapper").style.display = "block";
        document.getElementById("column").style.display = "block";
        elementPrice = "store_price";
        elementCompchek = "store_checkcomp";
        elementMedcheck = "store_checkmed";
    }

    $.ajax({
        url:'json/demo.json',
        type:'post',
        dataType:'json',
        success:function (jsonobj) {
            var jsonobj_keys = Object.keys(jsonobj);
            var locData_array = [];
            var jsonobjrentData = jsonobj[jsonobj_keys[2]];
            var jsonobjCharData = jsonobj[jsonobj_keys[5]];
            var jsonobjlocData = jsonobj[jsonobj_keys[3]];
            var jsonobjlocData_keys = Object.keys(jsonobjlocData);
            var jsonobjrentData_keys = Object.keys(jsonobjrentData);
            var jsonobjCharData_keys = Object.keys(jsonobjCharData);
            var rentData_array = [];
            var charData_arrary = [];
            if (storeId != 0) {
                for (var i = 0; i < jsonobjlocData_keys.length; i++) {
                    var templocData = jsonobjlocData[jsonobjlocData_keys[i]];
                    locData_array.push(templocData);
                }
//                console.log(locData_array);
                for (var i = 0; i < locData_array.length; i++) {

                    if (locData_array[i].storeId == storeId) {
                        store_data = locData_array[i];
                        if (rentId == 0) {
                            rentId = locData_array[i].rentId;
                        }
                    }
                }
                console.log(store_data);
                document.getElementById("store_drugname").innerHTML = store_data.description;
                if (store_data.timeDepInfoMap[2013].competitor == true) {
                    document.getElementById(elementCompchek).src = "img/checked.png"
                }
                if (store_data.timeDepInfoMap[2013].medicare == true) {
                    document.getElementById(elementMedcheck).src = "img/checked.png"
                }
                $.ajax({
                    url:'json/animate.json',
                    type:'post',
                    dataType:'json',
                    success:function (jsonobj) {
                        var jsonobj_keys = Object.keys(jsonobj);

                        var locData_array = [];

                        for (var i = 0; i < jsonobj_keys.length; i++) {

                            var templocData = jsonobj[jsonobj_keys[i]];
                            if (templocData.storeId == store_data.storeId) {
                                locData_array.push(templocData);
                            }
                        }

                        //console.log(locData_array[0].timeDepInfoMap);


                        /*Column*/
                        var Environment = sap.viz.env;
                        var CrosstableDataset = sap.viz.data.CrosstableDataset;
                        var vizcore = sap.viz.core;
                        var year = [];
                        var myrevenue = [];
                        var mycost = [];
                        for (var i = 0; i <= toYear-2013; i++) {
                            var j = 2013 + i;
                            year[i] =(j).toString();
                            myrevenue[i] = locData_array[0].timeDepInfoMap[j].revenue / 100;
                            mycost[i] = locData_array[0].timeDepInfoMap[j].cost / 100;
                            myrevenue[i] = FormatFloat(myrevenue[i], 2);
                            mycost[i] = FormatFloat(mycost[i], 2);
                        }
                        console.log(myrevenue);


                        Environment.initialize({
                            'log':'debug'
                        });
                        var chartOption = {
                            plotArea:{
                            },
                            title:{
                                text:'Revenue and Cost'
                            }
                        };

                        var ds = new CrosstableDataset();
                        ds.setData({
                            'analysisAxis':[
                                {
                                    'index':1,
                                    'data':[
                                        {
                                            'type':'Dimension',
                                            'name':'Year',
                                            'values':year

                                        }
                                    ]

                                }
                            ],
                            'measureValuesGroup':[
                                {
                                    'index':1,
                                    'data':[
                                        {
                                            'type':'Measure',
                                            'name':'Cost [Million RMB]',
                                            'values':[
//                                            [25, 136, 58, 128, 58]
                                                mycost
                                            ]
                                        }
                                        ,
                                        {
                                            'type':'Measure',
                                            'name':'Revenue [Million RMB]',
                                            'values':[
//                                            [199, 136, 58, 128, 127]
                                                myrevenue
                                            ]
                                        }
                                    ]
                                }
                            ]});

                        //TODO How to define feeding API?
                        var bar = vizcore.createViz({
                            type:'viz/column',
                            data:ds,
                            container:$('#store_chart'),
                            options:chartOption
                        });

                    },
                    error:function () {
                        alert("error");

                    },
                    beforeSend:function () {
                    }
                })
                ;
                var Environment = sap.viz.env;
                var CrosstableDataset = sap.viz.data.CrosstableDataset;
                var vizcore = sap.viz.core;

                Environment.initialize({
                    'log':'debug'
                });

                var chartOption = {
                    title:{
                        visible:true,
                        text:''
                    }
                };

                var ds = new CrosstableDataset();
                ds.setData({'analysisAxis':[
                        {
                            'index':1,
                            'data':[
                                {
                                    'type':'Dimension',
                                    'name':'Goods',
                                    'values':[ 'OTC', 'RX drug', 'Commodity', 'Cosmeceuticals']
                                }

                            ]
                        }
                    ], 'measureValuesGroup':[
                        {
                            'index':1,
                            'data':[
                                {
                                    'type':'Measure',
                                    'name':'Percentage',
                                    'values':[
//                                [20, 30, 30, 20 ]
                                        [store_data.timeDepInfoMap[2013].otc,
                                            store_data.timeDepInfoMap[2013].rx,

                                            store_data.timeDepInfoMap[2013].suppliers,
                                            store_data.timeDepInfoMap[2013].cosmeceuticals]
                                    ]
                                }
                            ]
                        }

                    ]}
                );
                var tagcloud = vizcore.createViz({
                    type:'viz/donut',
                    data:ds,
                    container:$('#store_chart1'),
                    options:chartOption
                });


            }


            for (var i = 0; i < jsonobjrentData_keys.length; i++) {
                var templocData = jsonobjrentData[jsonobjrentData_keys[i]];
                rentData_array.push(templocData);
            }

            for (var i = 0; i < jsonobjCharData_keys.length; i++) {
                var templocData = jsonobjCharData[jsonobjCharData_keys[i]];
                charData_arrary.push(templocData);
            }

//            console.log(rentData_array);
//            console.log(charData_arrary);


            for (var i = 0; i < rentData_array.length; i++) {

                if (rentData_array[i].rentId == rentId) {
                    rent_data = rentData_array[i];
                }
            }
            for (var i = 0; i < charData_arrary.length; i++) {

                if (charData_arrary[i].rentId == rentId) {
                    char_data = charData_arrary[i].timeDepInfoMap[2013];
                }
            }

//            console.log(rent_data);
//            console.log(char_data);
            var myPrice = rent_data.timeDepInfoMap["2013"].rate * 10000;
//            myPrice.toString();
            document.getElementById(elementPrice).innerHTML = myPrice;

            if (char_data.advLargeSquire == true) {
                document.getElementById("Astore_1").style.display = "";
            }
            if (char_data.disSmallSquire == true) {
                document.getElementById("Bstore_1").style.display = "";
            }

            if (char_data.advHospital == true) {
                document.getElementById("Astore_3").style.display = "";
            }

            if (char_data.advShopping == true) {
                document.getElementById("Astore_4").style.display = "";
            }
            if (char_data.disShopping == true) {
                document.getElementById("Bstore_4").style.display = "";
            }

            if (char_data.advMetroo == true) {
                document.getElementById("Astore_5").style.display = "";
            }

            if (char_data.advLowRate == true) {
                document.getElementById("Astore_6").style.display = "";
            }
            if (char_data.disHighRate == true) {
                document.getElementById("Bstore_6").style.display = "";
            }

            if (char_data.disSmallLiving == true) {
                document.getElementById("Bstore_7").style.display = "";
            }
            if (char_data.advSmallLiving == true) {
                document.getElementById("Astore_7").style.display = "";
            }
//                console.log(store_data);


        },
        error:function () {
            alert("error");

        },
        beforeSend:function () {
        }
    })
    ;

}
)
;
function submit() {
    var isCompetitor = document.getElementById("rent_compCheck").value;
    var isMedicare = document.getElementById("rent_medCheck").value;

    var c_otc = parseFloat(document.getElementById("i_otc").value);
    var c_rx = parseFloat(document.getElementById("i_rx").value);
    var c_supplier = parseFloat(document.getElementById("i_supplier").value);
    var c_cos = parseFloat(document.getElementById("i_cos").value);
    var c_sale = parseFloat(document.getElementById("i_sales").value);

    var c_name = document.getElementById("rent_drugname").value;

    if (c_otc != "" && c_rx != "" && c_supplier != "" && c_cos != "" && c_sale != "" && c_name != "") {
        if (isCompetitor == "true") {
            isCompetitor = true;
        }
        else {
            isCompetitor = false;
        }
        if (isMedicare == "true") {
            isMedicare = true;
        }
        else {
            isMedicare = false;
        }
        var myJSON = {"storeId":0,
            "rentId":rent_data.rentId,
            "description":c_name,
            "timeDepInfoMap":{
                "2013":{
                    "year":2013,
                    "competitor":isCompetitor,
                    "revenue":0,
                    "operationCost":0,
                    "commodityCost":0,
                    "onetimeCost":0,
                    "suppliers":c_supplier,
                    "cosmeceuticals":c_cos,
                    "otc":c_otc,
                    "rx":c_rx,
                    "medicare":isMedicare,
                    "numOfSales":c_sale
                }
            }

        };
        for (var i = 2014; i <= 2017; i++) {
            myJSON.timeDepInfoMap[i] = jQuery.extend(true, {}, myJSON.timeDepInfoMap[2013]);
            myJSON.timeDepInfoMap[i].year = i;
        }
        alert("Creat New Store successfully!");
    }
    else {
        alert("Please fill the required value!");
    }
    console.log(myJSON);

};
function deleteStore() {
    alert("delete");
};
function FormatFloat(num, pos) {
    var cn = String(Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos));
    var i = cn.indexOf(".")
    if (cn.indexOf(".") == -1) {
        cn += ".";
        while (pos > 0) {
            cn += "0";
            pos--;
        }
    } else {
        while (pos >= num.length - i) {
            cn += "0";
            pos--;
        }
    }
    return cn;
};

function test() {
    alert("warning");
}
