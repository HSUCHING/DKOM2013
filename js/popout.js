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

store_data = [];
rent_data = [];
char_data = [];

readJSON();

function readJSON(storeId, rentId) {
    storeId = 101;
    rentId = 0;
    $.ajax({
        url:'json/demo.json',
        type:'post',
        dataType:'json',
        success:function (jsonobj) {
            var jsonobj_keys = Object.keys(jsonobj);
            var jsonobjlocData = jsonobj[jsonobj_keys[3]];
            var jsonobjrentData = jsonobj[jsonobj_keys[2]];
            var jsonobjCharData = jsonobj[jsonobj_keys[5]];
            var jsonobjlocData_keys = Object.keys(jsonobjlocData);
            var jsonobjrentData_keys = Object.keys(jsonobjrentData);
            var jsonobjCharData_keys = Object.keys(jsonobjCharData);
            var locData_array = [];
            var rentData_array = [];
            var charData_arrary = [];
            for (var i = 0; i < jsonobjlocData_keys.length; i++) {
                var templocData = jsonobjlocData[jsonobjlocData_keys[i]];
                locData_array.push(templocData);
            }
            for (var i = 0; i < jsonobjrentData_keys.length; i++) {
                var templocData = jsonobjrentData[jsonobjrentData_keys[i]];
                rentData_array.push(templocData);
            }

            for (var i = 0; i < jsonobjCharData_keys.length; i++) {
                var templocData = jsonobjCharData[jsonobjCharData_keys[i]];
                charData_arrary.push(templocData);
            }
//            console.log(locData_array);
//            console.log(rentData_array);
//            console.log(charData_arrary);

            for (var i = 0; i < locData_array.length; i++) {

                if (locData_array[i].storeId == storeId) {
                    store_data = locData_array[i];
                    if (rentId == 0) {
                        rentId = locData_array[i].rentId;
                    }
                }
            }
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
//            console.log(store_data);
//            console.log(rent_data);
            console.log(char_data);

            document.getElementById("j_drugname").innerHTML = store_data.description;
            document.getElementById("j_price").innerHTML = rent_data.timeDepInfoMap["2013"].rate;

            if (store_data.timeDepInfoMap[2013].competitor == true) {
                document.getElementById("check_comp").src = "img/checked.png"
            }
            if (store_data.timeDepInfoMap[2013].medicare == true) {
                document.getElementById("check_med").src = "img/checked.png"
            }
            if (char_data.advLargeSquire == true) {
                document.getElementById("a_1").style.display="inline";
            }
            if (char_data.disSmallSquire == true) {
//                document.getElementById("b_1").style.visibility = "visible";
                document.getElementById("b_1").style.display="inline";
            }

            if (char_data.advHospital == true) {
                document.getElementById("a_3").style.display="inline";
            }

            if (char_data.advShopping == true) {
                document.getElementById("a_4").style.display="inline";
            }
            if (char_data.disShopping == true) {
//                document.getElementById("b_4").style.visibility = "visible";
                document.getElementById("b_4").style.display="inline";
            }

            if (char_data.advMetroo == true) {
                document.getElementById("a_5").style.display="inline";
            }

            if (char_data.advLowRate == true) {
                document.getElementById("a_6").style.display="inline";
            }
            if (char_data.disHighRate == true) {
//                document.getElementById("b_6").style.visibility = "visible";
                document.getElementById("b_6").style.display="inline";
            }

            if (char_data.disSmallLiving == true) {
//                document.getElementById("b_7").style.visibility = "visible";
                document.getElementById("b_7").style.display="inline";
            }
            if (char_data.advSmallLiving == true) {
                document.getElementById("a_7").style.display="inline";
            }
            console.log(store_data);
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
                            'values':['RX drug', 'OTC', 'Commodity', 'Cosmeceuticals']
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
                                [store_data.timeDepInfoMap[2013].rx,
                                    store_data.timeDepInfoMap[2013].otc,
                                    store_data.timeDepInfoMap[2013].suppliers,
                                    store_data.timeDepInfoMap[2013].cosmeceuticals]
                            ]
                        }
                    ]
                }
            ]});

            var tagcloud = vizcore.createViz({
                type:'viz/donut',
                data:ds,
                container:$('#chart1'),
                options:chartOption
            });

            /*Column*/
            var Environment = sap.viz.env;
            var CrosstableDataset = sap.viz.data.CrosstableDataset;
            var vizcore = sap.viz.core;

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
                                'values':['2013', '2014', '2015', '2016', '2017']

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
                                'name':'Cost',
                                'values':[
                                    [25, 136, 58, 128, 58]
                                ]
                            }
                            ,
                            {
                                'type':'Measure',
                                'name':'Revenue',
                                'values':[
                                    [199, 136, 58, 128, 127]
                                ]
                            }
                        ]
                    }
                ]});

            //TODO How to define feeding API?
            var bar = vizcore.createViz({
                type:'viz/column',
                data:ds,
                container:$('#chart'),
                options:chartOption
            });

        },
        error:function () {
            alert("error");

        },
        beforeSend:function () {
        }
    })
}




