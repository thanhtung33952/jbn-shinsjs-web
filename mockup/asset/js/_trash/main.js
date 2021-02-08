var current = "";
var mouseStillDown;
var dX = 0;

var observatories = {};
var observValue;
var damiData = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
var colors3 = ['#FDF1FD','#99CAFD','#3166FD','#0005FD','#FDFD00','#FD9900','#FD0000',
			   '#800080','#FF0000','#FF0000','#0000FF','#0000FF','#0000FF','#0000FF',
			   '#6600FF','#6600FF','#6600FF','#FF0000','#FF0000','#FF0000',];
var xml_obs;

var temperatuerWidget = '<div class="boxTitle">気　温</div>';
temperatuerWidget += '<img class="zoomButton" src="images/plus.png" ';
temperatuerWidget += ' onClick="javascript:boxControll2(event)"/>';
var temperatuerWidget2 = 'src="asset/lib/widget.html"';
temperatuerWidget2 += 'seamless scrolling="no" width="100%" height="100%"></iframe></div>';	

var mapWidget = 'seamless scrolling="no" width="100%" height="100%"></iframe>';
mapWidget += '<div class="boxTitle">各地の降雨状況</div>';
mapWidget += '<img class="zoomButton" src="images/minus.png" ';
mapWidget += ' onClick="javascript:boxControll2(event)"/></div>';

var idArray = ['P11','P12','P13','P21','P22','P23','P31','P32','P33','P41','P42','P43']

//************************************************
function createDashboard(sw){
	var num = $(".if").length;
	var iidd = idArray[num];
	var html = '<div class="boxElement" id="' + iidd + '">';
	if (sw == "T") {
		html += temperatuerWidget;
		html += '<iframe name="temperature1" id="temperature' + num + '" class="if"';
		html += temperatuerWidget2;
	}
	else if (sw == "M"){
		html += '<iframe name="map1" id="map' + num + '" class="if" src="asset/lib/map.html"';
		html += mapWidget;
	}
	$(".dashboard").append(html);
	console.log("num = " + num);
}
	$(document).ready(function(){
		$(".dashboard").html("");
		$("#rainMapMenu").css('visibility','visible');
		
		var ima = new Date();
		var str = ima.getMonth() + "月";
		str += ima.getDate() + "日　";
		str += ima.getHours() + "時";
		str += ima.getMinutes() + "分　";
		
		var R = Math.floor(Math.random()*100);
		if (R < 50) {
			str += "警報、注意報はありません。";
			$(".alertTop").text(str);
			$(".alertTop").css('background-color','green');
			$(".alertTop").css('color',' white');
		}
		else if (R < 80) {
			str += "強風注意報が出ています。";
			$(".alertTop").text(str);
			$(".alertTop").css('background-color',' orange');
			$(".alertTop").css('color',' black');
		}
		else {
			str += "大雨警報が出ています。";
			$(".alertTop").text(str);
			$(".alertTop").css('background-color','red');
			$(".alertTop").css('color',' white');
		}
		
		createDashboard('T');
		createDashboard('T');
		createDashboard('M');
		createDashboard('T');
		createDashboard('T');
		createDashboard('T');
		console.log("inside dashboard = " + $(".dashboard").index());
/*		$(".zoomButton").bind('click',function(){
		var myID =  $(this).closest("div").attr("id");
		boxControll(myID);
	})*/


		$(".myMenu").hover(function(){
			$(this).css('cursor','pointer');
		})
		


		$("#fullMapClose").bind('click',function(){
			$('.fullMap').css('visibility','hidden')
		})
		
		
	});

	function boxControll2(event){
		var iidd = $(event.target).parent().attr('id');
		boxControll(iidd);
	}
	function boxControll(iidd){
		console.log("inside boxcontroll " + iidd);
		var WW = $("#" + iidd).css('width');
		WW = parseInt(WW.replace("px", ""));
		if( WW < 400){
			switch (iidd){
				case "P11":
					moveMe('P12',2);
					moveMe('P13',5);
					moveMe('P21',6);
					moveMe('P22',7);
					moveMe('P23',8);
				/*	$("#P11S").css('visibility','hidden');*/
					$('#' + iidd).animate({width:'620px',height:'540px'},function(){
						/*
						$("#temperature1").contents().find("#P11S").css('visibility','hidden');
						$("#temperature1").contents().find("#P11L").css('visibility','visible');
						*/
						console.log("left to 0");
						$('#temperature0').contents().find(".container").css('left','0px'); 
					});   
					break;
				case "P12":
					current = "P12";
					$("#P12S").css('visibility', 'hidden');
					moveMe('P11',0);
					$('#' + iidd).animate({width:'615px',height:'535px',left:(pArray[1][0]+'px'),
										  top:(pArray[1][1]+'px')},function(){
						//$("#P11L").css('visibility','visible');
						$("#P12L").css('visibility','visible');
						
					});
					moveMe('P13',3);
					moveMe('P21',6);
					moveMe('P22',7);
					moveMe('P23',8);
					break;
				case "P13":
					current = "P13";
					moveMe('P11',0);
					moveMe('P12',3);
					$('#P13').animate({width:'615px',height:'535px',left:(pArray[1][0]+'px'),
									  top:(pArray[1][1]+'px')},function(){
					  $("#map2").contents().find(".container").css('left','0px'); 
					});
					moveMe('P21',6);
					moveMe('P22',7);
					moveMe('P23',8);
					break;
			   case "P21":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					$("#P21img").attr('src','images/img1L.png');
					$('#' + iidd).animate({width:'615px',height:'535px',left:(pArray[3][0]+'px'),
										  top:(pArray[3][1]+'px')},function(){
						
					}); 
					current = "P21";
					moveMe('P22',5);
					moveMe('P23',8);
					break;
			   case "P22":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);
					 $('#' + iidd).animate({width:'615px',height:'535px',left:(pArray[4][0]+'px'),
										   top:(pArray[4][1]+'px')},function(){
						$("#P22img").attr('src','images/img3L.png');
					});
					current = "P22";
					moveMe('P23',6);
					break;
				case "P23":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);
					moveMe('P22',6);
					current = "P23";
					 $('#' + iidd).animate({width:'615px',height:'535px',left:(pArray[4][0]+'px'),
										   top:(pArray[4][1]+'px')},function(){
						
					});
					  
					break;
			}
			$('#' + current).find('.zoomButton').attr('src','images/minus.png');
		}
		else {
			
			switch (iidd){
				case "P11":
					$('#' + iidd).animate({width:'300px',height:'260px'},function(){
						$("#temperature0").contents().find(".container").css('left','-620px');
					});
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);
					current = "P11";
					//$("#P11img").attr('src','images/img1.png');
					break;
				case "P12":
					moveMe('P11',0);
					$("#P12L").css('visibility','hidden'); 
					$('#' + iidd).animate({width:'300px',height:'260px'}, function(){						
						$("#P12S").css('visibility','visible'); 
					});
					moveMe('P13',2);
					moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);
					current = "P12";
					
					break;
				case "P13":
					moveMe('P11',0);
					moveMe('P12',1);
					$('#P13').animate({left:(pArray[2][0]+'px'),top:(pArray[2][1]+'px'),
									  width:'300px',height:'260px'}, function(){
								$("#map2").contents().find(".container").css('left','-620px');
										});                           
					moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);
					current = "P13";
					//$('.map-canvas2').css('height','84%');
					//moreMap();
					break;
				case "P21":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					$('#' + iidd).animate({width:'300px',height:'260px'});
					//moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);
					current = "P21";
					$("#P21img").attr('src','images/img1.png');
					break;
				case "P22":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);
					$('#' + iidd).animate({width:'300px',height:'260px'});
					moveMe('P23',5);
					current = "P22";
					$("#P22img").attr('src','images/img3.png');
					break;
				case "P23":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);			   
					$('#' + iidd).animate({left:(pArray[5][0]+'px'),top:(pArray[5][1]+'px'),width:'300px',height:'260px'});
					moveMe('P22',4);
					
					current = "P23";
					
					break;
			}
			$('#' + current).find('.zoomButton').attr('src','images/plus.png');
		}
	}
	
	var pArray = [[0,0],[320,0],[640,0],[0,280],[320,280],[640,280],[0,560],[320,560],[640,560]];
	function moveMe(boxID, posID) {
		if ($('#' + boxID).length > 0) {
			shrink(boxID);
			$('#' + boxID).animate({left:(pArray[posID][0]+'px'),top:(pArray[posID][1]+'px')});
		}
	}
	
	function expand(boxID){
	  var WW = $('#' + boxID).css('width');
	  WW = parseInt(WW.replace("px", ""));
	  if (WW < 400) {
		$('#' + boxID).animate({width:'615px',height:'535px'});
	  }			  
	}
	function shrink(boxID){
		console.log(boxID);
	  var WW = $('#' + boxID).css('width');
	  WW = parseInt(WW.replace("px", ""));
	  if (WW > 400) {
		$('#' + boxID).animate({width:'300px',height:'260px'},function(){
			switch (boxID){
				case "P11":
					$("#P11").contents().find(".container").css('left','-620px');
					break;
				case "P12":
					$('#P12img').attr('src','images/img2.png');
					break;
				case "P13":
					$('#P13img').attr('src','images/img3.png');
					break;
				case "P21":
					$('#P21img').attr('src','images/img1.png');
					break;
				case "P22":
					$('#P22img').attr('src','images/img2.png');
					break;
				case "P23":
					$('#P23img').attr('src','images/img3.png');
					break;
			}
		});
		$('#' + boxID).find('.zoomButton').attr('src','images/plus.png');
	  }			  
	}
function hAndL(container) {
	var con = document.getElementById("canvas_G");
	var horizontal = false;
  var
     graph, i;
    d1 = [[1,5],[2,7],[3,8],[4,9],[5,11],[6,12],[7,9],[8,12],[9,13],[10,15]],
    d2 = [[1,10],[2,12],[3,8],[4,5],[5,7],[6,9],[7,7],[8,9],[9,8],[10,5]],
	
	

  graph = Flotr.draw(con,[
    { data : d1, color: '#FFFFFF'},
    { data : d2}
    /*,
    { data : d3, label : 'Serie 3' }*/
  ], {
      xaxis : {
        noTicks : 5,
		//ticks : 10,
        tickFormatter : function (n) { return Math.floor(n)+'日'; },
        min: 3,   // Part of the series is not displayed.
        max: 10
      },
      yaxis : {
		min: -10,
        ticks : [-10, 0, 10, 20, 30, [40, "°C"]],
        max : 40
      },
      grid : {
        verticalLines : true,
		horizontalLines : true,
        backgroundColor : 'white'
      },
   bars : {
      show : true,
      stacked : true,
      horizontal : horizontal,
      barWidth : 0.2,
      lineWidth : 1,
	  opacity: 1,
      shadowSize : 0,
	  fillColor : {
		colors:['#FF0000','#0000FF'],
		start: 'top',
		end: 'bottom'
	  }
	  },
	spreadsheet : {
        show : true,
        tickFormatter : function (e) { return e+''; }
      }

	
  });
}

/* Max & Min Temperature */
function basic_candle(container) {
	var con = document.getElementById("canvas_G");
	var horizontal = false;
  var
    d1 = [],
    d2 = [],
    //d3 = [],
    graph, i;
    d1 = [[1,5],[2,7],[3,8],[4,9],[5,11],[6,12],[7,9],[8,12],[9,13],[10,15]],
    d2 = [[1,10],[2,12],[3,8],[4,5],[5,7],[6,9],[7,7],[8,9],[9,8],[10,5]],

  graph = Flotr.draw(con,[
    { data : d1,  color : '#FFFFFF'},
    { data : d2, 	  color:'#FF0000'
	 }
    /*,
    { data : d3, label : 'Serie 3' }*/
  ], {
      xaxis : {
        noTicks : 5,
		//ticks : 10,
        tickFormatter : function (n) { return Math.floor(n)+'日'; },
        min: 3,   // Part of the series is not displayed.
        max: 10
      },
      yaxis : {
		min: -10,
        ticks : [-10, 0, 10, 20, 30, [40, "°C"]],
        max : 40
      },
      grid : {
        verticalLines : true,
		horizontalLines : true,
        backgroundColor : 'white'
      },
   bars : {
      show : true,
      stacked : true,
      horizontal : horizontal,
      barWidth : 0.2,
      lineWidth : 1,
	  opacity: 1,
      shadowSize : 0
	  },
	spreadsheet : {
        show : true,
        tickFormatter : function (e) { return e+''; }
      }

	
  });
}
/*)(document.getElementById("canvas_G"));*/






/* Graph & Chart of Temperature */
	
function download_data(container) {
	var con = document.getElementById(container);
  var
    d1 = [],
    d2 = [],
    d3 = [],
    d4 = [[1,10],[2,12],[3,8],[4,12],[5,16],[6,16],[7,18],[8,15],[9,20],[10,24]],
    d5 = [[1,5],[2,7],[3,8],[4,9],[5,11],[6,12],[7,9],[8,12],[9,13],[10,15]],
    graph,
    i,x;
   // Draw the graph.
  graph = Flotr.draw(
    con, [ 
      { data : d4, label : '役場' , lines : { show : true }, points : { show : true }},
      { data : d5, label : '福沢川上流', lines : { show : true }, points : { show : true } }
    ],{
      xaxis : {
        noTicks : 5,
		//ticks : 10,
        tickFormatter : function (n) { return Math.floor(n)+'日'; },
        min: 3,   // Part of the series is not displayed.
        max: 10
      },
      yaxis : {
		min: -10,
        ticks : [-10, 0, 10, 20, 30, [40, "°C"]],
        max : 40
      },
      grid : {
        verticalLines : true,
        backgroundColor : 'white'
      },
      legend : {
        position : 'nw'
      },
      spreadsheet : {
        show : true,
        tickFormatter : function (e) { return e+''; }
      }
  });
}

/*)(document.getElementById("canvas_G"));

*/

function day_set(){
	var g = new Dygraph(
		document.getElementById('canvas_G'),
		'asset/temperatures.csv' ,
		{
			title: "下諏訪市の気温",
			showRangeSelector: true,
			rangeSelectorPlotStrokeColor: 'red',
			rangeSelectorPlotFillColor: 'lightyellow',
//			showRoller: true,
//			rollPeriod: 14,
//			customBars: true,
			ylabel: '気温' ,
		}
	);
}