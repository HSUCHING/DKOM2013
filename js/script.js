//$(function(){
//
//	var imp = impress();
//
//	$('#arrowLeft').click(function(e){
//		imp.prev();
//		e.preventDefault();
//	});
//
//	$('#arrowRight').click(function(e){
//		imp.next();
//		e.preventDefault();
//	});
//
//});


$.ajax({
    url:'../DKOM2013/json/demo.json',
    type:'post',
    dataType:'json',
    success:function(){
        alert("success");
    },
    error:function(){
        alert("error");
    }
})


$('#loading').ajaxSend(function(){
   alert("Hello")
});
