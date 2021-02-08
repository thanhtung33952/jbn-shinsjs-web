/*
    samll widget
        graphS[temperature, rain], rainS, temperatureS
    setting [largeWidget, samll widget, data source, selectedObs]
*/

var loaded =[0, 0, 0]; // Widget loaded then set value 1;

var dashboar_settings = [
	["map", ''],
	["widget", "temperature",1],
	["widget", "temperature",2],
	["forecast",''],
	["life",''],
	['radar','']
];

var widge0_setting = ["graphL", "graphS", "temperature",1];
var widge1_setting = ["graphL", "graphS", "rain",1];
var widge2_setting = ["", "", "rain"]; // map
var widge3_setting = ["graphL", "graphS", "forecast",2];
var widge4_setting = ["tableL", "temperatureS", "temperature"]; //radar
var widge5_setting = ["graphL", "graphS", "temperature"]; // life

/*
var widge0_setting = ["graphL", "graphS", "temperature",1];
var widge1_setting = ["graphL", "graphS", "rain",1];
var widge2_setting = ["", "", "rain"]; // map
var widge3_setting = ["graphL", "graphS", "forecast",2];
var widge4_setting = ["tableL", "temperatureS", "temperature"]; //radar
var widge5_setting = ["graphL", "graphS", "temperature"]; // life
*/
var rainColor = "#6699FF";
var temperatureColor = "#FF9900";

var myNum;  // IMPORTANT, widget number to reload widget html

var current = "";
var mouseStillDown;
var dX = 0;

var observatories = [];
var observValue;
var damiData = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
var colors3 = ['#FDF1FD','#99CAFD','#3166FD','#0005FD','#FDFD00','#FD9900','#FD0000',
			   '#800080','#FF0000','#FF0000','#0000FF','#0000FF','#0000FF','#0000FF',
			   '#6600FF','#6600FF','#6600FF','#FF0000','#FF0000','#FF0000',];
var xml_obs;

var initData = [
    ['date_time',"201505251625"],
  ['01',17,2,29],  
  ['02',12,4,22],  
  ['03',13,6,19],  
  ['04',14,20,30],  
  ['05',15,25,49],  
  ['06',16,10,50],  
  ['07',17,40,100],  
  ['08',18,30,120]  
];

/* Widget contents */


var mapWidget = 'seamless scrolling="no" width="100%" height="100%"></iframe>';
mapWidget += '<div class="boxTitle">各地の降雨状況</div>';
mapWidget += '<img class="hamburger" src="images/hamburger.png" onClick="javascript:doMenu(event)" />';
mapWidget += '<img class="zoomButton" src="images/minus.png" ';
mapWidget += ' onClick="javascript:boxControll2(event)"/></div>';

var idArray = ['P11','P12','P13','P21','P22','P23','P31','P32','P33','P41','P42','P43']; // widget id

var backMenuScript ='<div class="backMenu">';
backMenuScript +='<div class="backItem">';
backMenuScript +='<img class="backIcon" src="images/icon_map.png" onClick="javascript:goIFrameM(event)" /></div>';
backMenuScript +='<div class="backItem">';
backMenuScript +='<img class="backIcon" src="images/icon_temp.png" onClick="javascript:goIFrameT(event)" /></div>';
backMenuScript +='<div class="backItem">';
backMenuScript +='<img class="backIcon" src="images/icon_rain.png" onClick="javascript:goIFrameR(event)" /></div>';
backMenuScript +='<div class="backItem">';
backMenuScript +='<img class="backIcon" src="images/icon_cancel.png" onClick="javascript:goIFrameC(event)" />';

function obsPoint(s) {
	for(var i=0; i<6; i++){
		window.frames[i].frameElement.contentWindow.setObsF(s);
	}
}

// Hamburger Icon has clicked, iframe movement.
function doMenu(event){
    var iidd = $(event.target).parent().parent().attr('id');
    var W = "#widget" + getWidgetID(iidd);
    var ww = $(W).css('left');
    if(ww == '100px'){
        $(W).animate({'left':'0px'});
    }
    else {
        $(W).animate({'left':'100px'});
    }
}

function getWidgetID(iidd){
    var R;
    var ids=["P11","P12","P13","P21","P22","P23"];
    for (var i=0; i<ids.length; i++){
        if(iidd == ids[i]){
            R = i;
            break;
        }
    }
    return R;
}

//******************************  back menu has selected ****************
//******************************  back menu has selected ****************
//******************************  back menu has selected ****************

// Temperature widthet
function goIFrameT(event){
    var iidd = $(event.target).parent().parent().parent().attr('id'); //P11, P12,...
    var n = getWidgetID(iidd); //0. 1. ...
    myNum = n; // important
/*    if( window.parent.$('#' + iidd).css('width') == '300px' ){
    	$("#widget" + n).animate({'left':'200px'});
    }
}
function goIFrameT2(){    
    // Reload
    var n = myNum; // important*/
    $("#settings" + n).text("graphL,temperatureS,temperature");            
    document.getElementById('widget' + n).contentDocument.location.reload(true);
    $("#widget" + n).animate({'left':'0px'});
}
// Rain widget
function goIFrameR(event){
    var iidd = $(event.target).parent().parent().parent().attr('id'); //P11, P12,...
    var n = getWidgetID(iidd); //0. 1. ...
     myNum = n; // important
/*    if( window.parent.$('#' + iidd).css('width') == '300px' ){
    	$("#widget" + n).animate({'left':'200px'});
    }
}
function goIFrameR2(){    
    // Reload
    var n = myNum; // important*/
    $("#settings" + n).text("graphL,rainS,rain");        
    document.getElementById('widget' + n).contentDocument.location.reload(true);
    $("#widget" + n).animate({'left':'0px'});
}
// Map widget
function goIFrameM(event){
    var iidd = $(event.target).parent().parent().parent().attr('id'); //P11, P12,...
    var n = getWidgetID(iidd); //0. 1. ...
    // Reload
    myNum = n; // important
    $("#settings" + n).text("MapL,MapS,rain");            
    //document.getElementById('widget' + n).contentDocument.location.reload(true);
    $("#widget" + n).attr('src','asset/lib/map.html');
    $("#widget" + n).animate({'left':'0px'});
    $("#boxTitle" + n).text("各地の降雨状況");
    
}
// Cancel
function goIFrameC(event){
    var iidd = $(event.target).parent().parent().parent().attr('id');
    var W = "#widget" + getWidgetID(iidd);
/*    console.log("1>" + $(event.target).parent().attr('id'));
    console.log("2>" + $(event.target).parent().parent().attr('id'));
    console.log("3>" + $(event.target).parent().parent().parent().attr('id'));
    console.log("4>" + $(event.target).parent().parent().parent().parent().attr('id'));*/
    $(W).animate({'left':'0px'});
}


// Read initial setting data
function getTorR(n){
    var S;
    switch (n){
        case 0:
            S = widge0_setting;
            break;
        case 1:
            S = widge1_setting;
            break;
        case 2:
            S = widge2_setting;
            break;
        case 3:
            S = widge3_setting;
            break;
        case 4:
            S = widge4_setting;
            break;
        case 5:
            S = widge5_setting;
            break;
    }
    return S;
}
//************************************************
// Create Dashboard for the first time only.
var temperatuerWidget = '<img class="hamburger" src="images/hamburger.png" ';
temperatuerWidget += 'onClick="javascript:doMenu(event)" />';
temperatuerWidget += '<img class="zoomButton" src="images/plus.png" ';
temperatuerWidget += ' onClick="javascript:boxControll2(event)"/></div>';

function createDashboard(sw){
	var num = $(".if").length;
    myNum = num;
	var iidd = idArray[num];
    var TorR = getTorR(num)[2];
    console.log("calling is " + num + '/' + sw + "/" + iidd);
    
	var html = '<div class="boxElement" id="' + iidd + '">';
    html += backMenuScript;
    html += '<p class="stgs" id="settings' + num + '">' + getTorR(num) + '</p></div></div>';
    
    var bTitle ;
    (TorR == "rain")? bTitle = "雨　量" : bTitle="気　温";
    if(sw == 'R') { bTitle = '雨雲の様子';}
    if(sw == 'life') { bTitle = '生活情報';}
    if(sw == 'F') { bTitle = 'お天気';}
	html += '<div class="boxTitle"><p class="boxTop" id="boxTitle' + num + '">' + bTitle + '</p>';            
    html += temperatuerWidget;
	html += makeOmenu();
	html += '<iframe name="widget" id="widget' + num + '" class="if"';
    if(sw == "M"){
       html += 'src="asset/lib/map.html"'; 
    }
    else if(sw == 'R') {
    	html += 'src="asset/lib/radar.html"';
    }
    else if(sw == 'life') {
    	html += 'src="asset/lib/life.html"';
    }
    else if(sw == 'F') {
    	html += 'src="asset/lib/forecast.html"';
    }
    else {
       html += 'src="asset/lib/widget.html"';  
    }   
    html += 'seamless scrolling="no" width="100%" height="100%"></iframe></div>';	
	
	$(".dashboard").append(html);
	//console.log("num = " + num);
    if(num < 5){
        setTimeout(function(){
            var par = 'T'
            if(num == 1){
                par = 'M';
            }
            if(num == 2) {
            	par = 'F';
            }
            if(num == 3) {
            	par = 'R';
            }
            if(num == 4) {
            	par = 'life';
            }
            createDashboard(par);
        },1000)
        
    }
	else {
		var footer = "<div class='footer'>下諏訪町 Copyright@2015</div>";
		$(".dashboard").append(footer);
	}
}


/* Observatory Selection Menu */

function makeOmenu(){
	var obsPane = "<div id='obsPane'>";
	for(var i=0; i<observatories.length; i++){
		obsPane += "<div class='obsBtn' id='obsBtn" + i + "'>";
		obsPane += observatories[i] + "</div>";
	}
	obsPane += '</div>';
	//console.log(observatories);
	return obsPane;
}

/*****/
var catchRain;
var tmp_catchRain;

function updateCatchRain(){
    $.ajax({
        url: "../asset/catchRain36.php",
        dataType: "text",
        cache: false,
        success: function(str){
            catchRain = str;  // 0 or 1
            /*
            var tmp_catchRain;
            (str == "1") ? tmp_catchRain = true : tmp_catchRain = false ;
            if(tmp_catchRain != catchRain){
                catchRain = tmp_catchRain;
                checkRainOrFine();
            }*/
        }
    })
}


/* __________________________________________________________________________  */

	$(document).ready(function(){
        
        
        
		$(".dashboard").html("");
		//$("#rainMapMenu").css('visibility','visible');
		
		var ima = new Date();
		var str = (ima.getMonth() + 1) + "月";
		str += ima.getDate() + "日　";
		str += ima.getHours() + "時";
		str += ima.getMinutes() + "分　";
/*		
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
			$(".alertTop").css('background-color',' yellow');
			$(".alertTop").css('color',' black');
		}
		else {
			str += "大雨警報が出ています。";
			$(".alertTop").text(str);
			$(".alertTop").css('background-color','red');
			$(".alertTop").css('color',' white');
		}
/*
	/* read xml file */
	$.ajax({
		url: "asset/observatories.xml",
		dataType: "text",
		success: function(xml){
			$xml = $($.parseXML(xml));
			var n = 1;
			$(xml).find('general').each(function(){
				//console.log($(this).find('name').text() );
				var lat = $(this).find('name').text();
				$("._title").text(lat + "防災気象情報");
			});
			$(xml).find('observatory').each(function(){
				var obName = $(this).find('name').text();
				observatories.push(obName);
				$("#tb" + n).text(obName);
				n++;
				//console.log(obName);
			})
            createDashboard('T');
		}
	});
	
        
        /* creat dashboard */
        /*
		setTimeout(function(){
			createDashboard('T');
		},600)
		*/

		$(".myMenu").hover(function(){
			$(this).css('cursor','pointer');
		})
		$(".zoomButton").hover(function(){
			$(this).css('cursor','pointer');
		})
		$(".hamburger").hover(function(){
			$(this).css('cursor','pointer');
		})
		
        
	});


    /* Widget contents num=widget window num 0 to 5, top ID should be id of iFrame */
    function thisContents(num, sw){
        var iidd = "#widget" + num;
        //console.log('thisContents is ' + iidd + '/' + sw);
        switch (sw) {
            case "graphS":
                $(iidd).contents().find(".container").css('left', '-620px');
                $(iidd).contents().find("#canvas_GS").css('top', '30px');
                $(iidd).contents().find("#temperature_GS").css('top', '250px');
                $(iidd).contents().find("#rain_GS").css('top', '600px');
                //draw graphs
                download_data("canvas_G");
                //download_dataS("canvas_GS");
                break;
            case "temperatureS":
                $(iidd).contents().find(".container").css('left', '-620px');
                $(iidd).contents().find("#canvas_GS").css('top', '250px');
                $(iidd).contents().find("#temperature_GS").css('top', '0px');
                $(iidd).contents().find("#rain_GS").css('top', '600px');
                //generateTable();
                break;
            case "rainS":
                $(iidd).contents().find(".container").css('left', '-620px');
                $(iidd).contents().find("#canvas_GS").css('top', '600px');
                $(iidd).contents().find("#temperature_GS").css('top', '250px');
                $(iidd).contents().find("#rain_GS").css('top', '0px');
                break;
            case "graphL":
                //console.log('koko...........');
            //    $("#widget0").contents().find(".container").css('left', '0px');
                $(iidd).contents().find(".container").css('left', '0px');
                $(iidd).contents().find("#canvas_G").css('top', '120px');
                $(iidd).contents().find("#dt").css('top', '574px');
                //draw graphs
                //download_data("canvas_G");
                //download_dataS("canvas_GS");
                break;
            case "tableL":
                $(iidd).contents().find(".container").css('left', '0px');
                $(iidd).contents().find("#canvas_G").css('top', '620px');
                $(iidd).contents().find("#dt").css('top', '74px');
                //draw graphs
                download_data("canvas_G");
                //download_dataS("canvas_GS");
                break;
         }
    }

    //*************************************************************************
    /* widget zoom button has clicked */
	function boxControll2(event){
		var iidd = $(event.target).parent().parent().attr('id');
		boxControll(iidd);
	}
	function boxControll(iidd){
		//console.log("inside boxcontroll " + iidd);
        
        // Width of this widget
		var WW = $("#" + iidd).css('width');
		WW = parseInt(WW.replace("px", ""));
		if( WW < 400){
			switch (iidd){
				case "P11":
                    current = "P11";
					$('#' + iidd).animate({width:'620px',height:'540px'},function(){
                        window.frames[0].frameElement.contentWindow.showMyContents();
					});   
					moveMe('P12',2);
					moveMe('P13',5);
					moveMe('P21',6);
					moveMe('P22',7);
					moveMe('P23',8);
					break;
				case "P12":
					current = "P12";
					moveMe('P11',0);
					$('#' + iidd).animate({width:'615px',height:'535px',left:(pArray[1][0]+'px'),
										  top:(pArray[1][1]+'px')},function(){
						window.frames[1].frameElement.contentWindow.showMyContents();						
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
					  window.frames[2].frameElement.contentWindow.showMyContents(); 
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
						window.frames[3].frameElement.contentWindow.showMyContents();
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
						window.frames[4].frameElement.contentWindow.showMyContents();
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
						window.frames[5].frameElement.contentWindow.showMyContents();
					});
					  
					break;
			}
			$('#' + current).find('.zoomButton').attr('src','images/minus.png');
		}
		else {
			// Transform to small widget
			switch (iidd){
				case "P11":
					$('#' + iidd).animate({width:'300px',height:'260px'},function(){
						window.frames[0].frameElement.contentWindow.showMyContents();
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
					current = "P12";
					moveMe('P11',0);
					$('#' + iidd).animate({width:'300px',height:'260px'}, function(){						
						window.frames[1].frameElement.contentWindow.showMyContents(); 
					});
					moveMe('P13',2);
					moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);					
					break;
				case "P13":
					moveMe('P11',0);
					moveMe('P12',1);
					$('#P13').animate({left:(pArray[2][0]+'px'),top:(pArray[2][1]+'px'),
									  width:'300px',height:'260px'}, function(){
								window.frames[2].frameElement.contentWindow.showMyContents();
										});                           
					moveMe('P21',3);
					moveMe('P22',4);
					moveMe('P23',5);
					current = "P13";
					break;
				case "P21":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					$('#' + iidd).animate({width:'300px',height:'260px'}, function(){
                        window.frames[3].frameElement.contentWindow.showMyContents();
                    });
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
					$('#' + iidd).animate({width:'300px',height:'260px'}, function(){
                        window.frames[4].frameElement.contentWindow.showMyContents();
                        });
					moveMe('P23',5);
					current = "P22";
					$("#P22img").attr('src','images/img3.png');
					break;
				case "P23":
					moveMe('P11',0);
					moveMe('P12',1);
					moveMe('P13',2);
					moveMe('P21',3);			   
					$('#' + iidd).animate({left:(pArray[5][0]+'px'),top:(pArray[5][1]+'px'),
                                          width:'300px',height:'260px'}, function(){
                        window.frames[5].frameElement.contentWindow.showMyContents();
                    });
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
       // console.log('inside shrink() : ' + boxID);
	  var WW = $('#' + boxID).css('width');
	  WW = parseInt(WW.replace("px", ""));
	  if (WW > 400) {
		$('#' + boxID).animate({width:'300px',height:'260px'},function(){
			switch (boxID){
				case "P11":
					window.frames[0].frameElement.contentWindow.showMyContents();
					break;
				case "P12":
					window.frames[1].frameElement.contentWindow.showMyContents();
					break;
				case "P13":
					window.frames[2].frameElement.contentWindow.showMyContents();
					break;
				case "P21":
					window.frames[3].frameElement.contentWindow.showMyContents();
					break;
				case "P22":
					window.frames[4].frameElement.contentWindow.showMyContents();
					break;
				case "P23":
					window.frames[5].frameElement.contentWindow.showMyContents();
					break;
			}
		});
		$('#' + boxID).find('.zoomButton').attr('src','images/plus.png');
	  }			  
	}
