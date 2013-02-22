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
};