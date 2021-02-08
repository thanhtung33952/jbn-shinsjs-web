/*
 *
 *  Line 525 test switch
 *
 *  
    samll widget
        graphS[temperature, rain], rainS, temperatureS
    setting [largeWidget, samll widget, data source, selectedObs]
*/

var loaded = [0, 0, 0]; // Widget loaded then set value 1;

var dashboad_settings = [];
dashboad_settings[0] = [];
dashboad_settings[1] = ["widget1", "", ""];
dashboad_settings[2] = ["widget2", ''];
dashboad_settings[3] = ["widget3", ''];
dashboad_settings[4] = ["widget4", "1", 1, ""];
dashboad_settings[5] = ["widget5", "1", 1, ""];
dashboad_settings[6] = ["widget6", "1", 1, ""];
dashboad_settings[7] = ["widget7", "1", 1, ""];
dashboad_settings[8] = ["widget8", "1", 1, ""];
dashboad_settings[9] = ["widget9", "1", 1, ""];


var myNum; // IMPORTANT, widget number to reload widget html

var current = "";
var mouseStillDown;
var dX = 0;

var observatories = [];
var observValue;
var damiData = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
var colors3 = ['#FDF1FD', '#99CAFD', '#3166FD', '#0005FD', '#FDFD00', '#FD9900', '#FD0000',
			   '#800080', '#FF0000', '#FF0000', '#0000FF', '#0000FF', '#0000FF', '#0000FF',
			   '#6600FF', '#6600FF', '#6600FF', '#FF0000', '#FF0000', '#FF0000', ];
var xml_obs;

var initData = [
    ['date_time', "201505261025"],
  ['01', , 2, 29],
  ['02', , 4, 22],
  ['03', , 6, 19],
  ['04', , 20, 30],
  ['05', , 25, 49],
  ['06', , 10, 50],
  ['07', 17, 40, 100],
  ['08', , 30, 120]
];

/* Widget contents */

/*
var mapWidget = 'seamless scrolling="no" width="100%" height="100%"></iframe>';
mapWidget += '<div class="boxTitle">各地の降雨状況</div>';
mapWidget += '<img class="hamburger" src="images/hamburger.png" onClick="javascript:doMenu(event)" />';
mapWidget += '<img class="zoomButton" src="images/minus.png" ';
mapWidget += ' onClick="javascript:boxControll2(event)"/></div>';
*/
var idArray = ['P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33', 'P41', 'P42', 'P43']; // widget id

var backMenuScript = '<div class="backMenu">';
backMenuScript += '<div class="backItem">';
backMenuScript += '<img class="backIcon" src="images/icon_map.png" onClick="javascript:goIFrameM(event)" /></div>';
backMenuScript += '<div class="backItem">';
backMenuScript += '<img class="backIcon" src="images/icon_temp.png" onClick="javascript:goIFrameT(event)" /></div>';
backMenuScript += '<div class="backItem">';
backMenuScript += '<img class="backIcon" src="images/icon_rain.png" onClick="javascript:goIFrameR(event)" /></div>';
backMenuScript += '<div class="backItem">';
backMenuScript += '<img class="backIcon" src="images/icon_cancel.png" onClick="javascript:goIFrameC(event)" />';

function obsPoint(s) {
	for (var i = 0; i < 6; i++) {
		window.frames[i].frameElement.contentWindow.setObsF(s);
	}
}

// Hamburger Icon has clicked, iframe movement.
function doMenu(event) {
	var iidd = $(event.target).parent().parent().attr('id');
	var W = "#widget" + getWidgetID(iidd);
	var ww = $(W).css('left');
	if (ww == '100px') {
		$(W).animate({
			'left': '0px'
		});
	} else {
		$(W).animate({
			'left': '100px'
		});
	}
}

function getWidgetID(iidd) {
	var R;
	var ids = ["P11", "P12", "P13", "P21", "P22", "P23", "P31", "P32", "P33"];
	for (var i = 0; i < ids.length; i++) {
		if (iidd == ids[i]) {
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
function goIFrameT(event) {
	var iidd = $(event.target).parent().parent().parent().attr('id'); //P11, P12,...
	var n = getWidgetID(iidd); //0. 1. ...
	myNum = n; // important

	var url = 'asset/lib/widget.html';
	dashboad_settings[n + 1] = ["widget", "temperature", 7, "graph"];
	//document.getElementById('widget' + n).contentDocument.location.reload(true);
	document.getElementById('widget' + n).contentDocument.location.href = url;
	$("#widget" + n).animate({
		'left': '0px'
	});
	$("#boxTitle" + n).text("作業中のタスク");
}
// Rain widget
function goIFrameR(event) {
	var iidd = $(event.target).parent().parent().parent().attr('id'); //P11, P12,...
	var n = getWidgetID(iidd); //0. 1. ...
	myNum = n; // important
	var url = 'asset/lib/widgetR.html';
	dashboad_settings[n + 1] = ["widget", "rain", 1, "graph"];
	//document.getElementById('widget' + n).contentDocument.location.reload(true);
	document.getElementById('widget' + n).contentDocument.location.href = url;
	$("#widget" + n).animate({
		'left': '0px'
	});
	$("#boxTitle" + n).text("新SJSからのお知らせ");
	//console.log('???????n=' + n);
}

// Cancel
function goIFrameC(event) {
	var iidd = $(event.target).parent().parent().parent().attr('id');
	var W = "#widget" + getWidgetID(iidd);
	/*    //console.log("1>" + $(event.target).parent().attr('id'));
	    //console.log("2>" + $(event.target).parent().parent().attr('id'));
	    //console.log("3>" + $(event.target).parent().parent().parent().attr('id'));
	    //console.log("4>" + $(event.target).parent().parent().parent().parent().attr('id'));*/
	$(W).animate({
		'left': '0px'
	});
}


// Read initial setting data
function getTorR(n) {
	var S;
	switch (n) {
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
/*var temperatuerWidget = '<img class="hamburger" src="images/hamburger.png" ';
temperatuerWidget += 'onClick="javascript:doMenu(event)" />';
var temperatuerWidget = '<a href=>';*/

function createDashboard(order) { // order is 1,2,3...


	var sw = dashboad_settings[order][0];
	var num = $(".if").length; //num is 
	myNum = num;
	var iidd = idArray[num];

	var temperatuerWidget = '</div><a href="javascript:boxControll2(\'' + iidd + '\')">';
	temperatuerWidget += '<img class="zoomButton" src="images/plus.png"/></a>';

	var html = '';
	if (0 < num && num < 6) {
		html = '<div class="boxElement" id="' + iidd + '">';
	} else if (num == 8) {
		html = '<div class="boxElement_4" id="' + iidd + '">';
	} else if (num == 0) {
		html = '<div class="boxElement_3" id="' + iidd + '">';
	} else {
		html = '<div class="boxElement_2" id="' + iidd + '">';
	}

	var bTitle;
	var TR = dashboad_settings[order][0];
	var TR1 = dashboad_settings[order][1];
	//console.log(order + '-------' + TR);

	var thisIcon = "";
	switch (TR) {
		case "widget2":
			bTitle = "受信箱";
			thisIcon = "outline_save_alt_white_18dp.png";
			break;
		case "widget3":
			bTitle = "送信箱";
			thisIcon = "outline_vertical_align_top_white_18dp.png";
			break;
		case "widget5":
			bTitle = "物件管理";
			thisIcon = "outline_format_list_numbered_white_18dp.png";
			break;
		case "widget4":
			bTitle = "進捗状況";
			thisIcon = "outline_keyboard_tab_white_18dp.png";
			break;
		case "widget6":
			bTitle = "業務・請求管理";
			thisIcon = "outline_view_list_white_18dp.png";
			break;
		case "widget1":
			bTitle = "すぐにすべき事";
			thisIcon = "outline_sms_white_18dp.png";
			break;
		case "widget7":
			bTitle = "新規調査などの申し込み";
			thisIcon = "outline_create_white_18dp.png";
			break;

		case "widget8":
			bTitle = "プロフィール（設定管理）";
			thisIcon = "outline_toggle_off_white_18dp.png";
			break;

		case "widget9":
			bTitle = "業務リソース";
			thisIcon = "outline_folder_white_18dp.png";
			break;

	}
	html += '<img class="leftIcon" src="images/icons/' + thisIcon + '" />';
	html += '<div class="boxTitle"><p class="boxTop" id="boxTitle' + num + '">' + bTitle + '</p>';


	html += temperatuerWidget;
	//html += makeOmenu();
	html += '<iframe name="widget" id="widget' + num + '" class="if"';
	//html += 'src="_widgets/0.html"';
	switch (num) {
		case 0:
			html += 'src="_widgets/5.html"';
			break;
		case 1:
			html += 'src="_widgets/0.html"';
			break;
		case 2:
			html += 'src="_widgets/1.html"';
			break;
		case 3:
			html += 'src="_widgets/2.html"';
			break;
		case 4:
			html += 'src="_widgets/3.html"';
			break;
		case 5:
			html += 'src="_widgets/4.html"';
			break;
		case 6:
			html += 'src="_widgets/6.html"';
			break;
		case 7:
			html += 'src="_widgets/7.html"';
			break;
		case 8:
			html += 'src="_widgets/8.html"';
			break;
	}
	html += 'seamless scrolling="no" width="100%" height="100%"></iframe></div>';

	$(".dashboard").append(html);

	order++;
	if (order < 10) {
		setTimeout(function () {
			createDashboard(order);
		}, 500);
	} else {
		var footer = "<div class='footer'>Nwe SJS Copyright@2018, Jiban Net all rights reserved.</div>";
		$(".dashboard").append(footer);
	}
}

/* __________________________________________________________________________  */
/* __________________________________________________________________________  */
/* __________________________________________________________________________  */
$(document).ready(function () {

	createDashboard(1);

	$(".myMenu").hover(function () {
		$(this).css('cursor', 'pointer');
	})
	$(".zoomButton").hover(function () {
		$(this).css('cursor', 'pointer');
	})
	$(".hamburger").hover(function () {
		$(this).css('cursor', 'pointer');
	})
	$(".modeBtn").hover(function () {
		$(this).css('cursor', 'pointer');
	})
});
/*
function setInitSelector() {
	var today = new Date();
	var m = today.getMonth() + 1;
	if (m < 10) {
		m = "0" + m
	}
	var d = today.getDate();
	console.log(m + " % " + d);
	$("#mmonthSelector").val(m);
	$("#ddaySelector").val(d);

}
*/

/* Widget contents num=widget window num 0 to 5, top ID should be id of iFrame */

/*
function thisContents(num, sw) {
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
*/
//*************************************************************************
/* widget zoom button has clicked */
function boxControll2(n) {
	console.log("boxControll2 has clicked n = " + n);
	//var iidd = $(event.target).parent().parent().attr('id');
	boxControll(n);
}

function closeAll() {
	var list = Array("P11", "P12", "P13", "P21", "P22", "P23", "P31", "P32", "P33");
	for (var i = 0; i < 9; i++) {
		$('#' + list[i]).animate({
			width: '310px',
			height: '270px'
		}, function () {
			window.frames[i].frameElement.contentWindow.changeSize();
		})
	}
}

function getWinNum(iidd) {
	var winNumArray = Array("P11", "P12", "P13", "P21", "P22", "P23", "P31", "P32", "P33");
	for (var i = 0; i < winNumArray.length; i++) {
		if (winNumArray[i] == iidd) {
			var winNum = i;
		}
	}
	return winNum;

}

function boxControll(iidd) {
	console.log("inside boxcontroll " + iidd);

	// Prepend animation after widget has loaded
	var sum = loaded[0] + loaded[1] + loaded[2];
	//console.log("loaded = " + loaded.toString());
	if (sum != 3) {
		//return;
	}

	var winNumArray = Array("P11", "P12", "P13", "P21", "P22", "P23", "P31", "P32", "P33");
	var winNum;
	for (var i = 0; i < winNumArray.length; i++) {
		if (winNumArray[i] == iidd) {
			winNum = i;
		}
	}
	console.log("winNum = " + winNum)
	var closed = false;

	// Width of this widget
	var WW = $("#" + iidd).css('width');
	WW = parseInt(WW.replace("px", ""));
	if (WW < 400) {
		//closeAll();
		for (var j = 0; j < winNumArray.length; j++) {
			var www = $("#" + winNumArray[j]).css('width').replace('px', '');
			www = parseInt(www);
			if (www > 400) {
				closed = true;
				closeMe(iidd, winNumArray[j]);
			}
		}
		if (closed == false) {
			openMe(iidd);
		}

	} else {
		closeMe(iidd, iidd)
	}
}

function openMe(iidd) {
	switch (iidd) {
		case "P11":
			console.log("P11 start");
			current = "P11";
			moveMe('P11', 0);
			moveMe('P12', 2);
			moveMe('P13', 5);
			moveMe('P21', 6);
			moveMe('P22', 7);
			moveMe('P23', 8);
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			break;
		case "P12":
			current = "P12";
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 3);
			moveMe('P21', 6);
			moveMe('P22', 7);
			moveMe('P23', 8);
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			break;
		case "P13":
			current = "P13";
			moveMe('P11', 0);
			moveMe('P12', 3);
			moveMe('P13', 1);
			moveMe('P21', 6);
			moveMe('P22', 7);
			moveMe('P23', 8);
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			break;
		case "P21":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			current = "P21";
			moveMe('P21', 3);
			moveMe('P22', 5);
			moveMe('P23', 8);
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			$("#P21img").attr('src', 'images/img1L.png');
			break;
		case "P22":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			current = "P22";
			moveMe('P23', 4);
			moveMe('P23', 6);
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			break;
		case "P23":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 6);
			moveMe('P23', 4);
			current = "P23";
			moveMe('P31', 9);
			moveMe('P32', 10);
			moveMe('P33', 11);
			break;
		case "P31":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			$("#P31img").attr('src', 'images/img1L.png');
			current = "P31";
			moveMe('P31', 6);
			moveMe('P32', 8);
			moveMe('P33', 11);
			break;
		case "P32":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			current = "P32";
			moveMe('P32', 7);
			moveMe('P33', 9);
			break;
		case "P33":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			current = "P33";
			moveMe('P32', 9);
			moveMe('P33', 7);
			break;
	}

	winNum = getWinNum(iidd);
	$('#' + iidd).animate({
		width: '630px',
		height: '550px'
	}, function () {
		window.frames[winNum].frameElement.contentWindow.changeSize();
	});


	$('#' + current).find('.zoomButton').attr('src', 'images/minus.png');
	$(".footer").css('top', '1120px');
	//	} else {
	//		closeMe(openID, iidd);
	//	}
}
// Transform to small widget
function closeMe(openID, iidd) {

	/*
	switch (iidd) {
		case "P11":
			console.log("P11, close " + iidd)
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//			current = "P11";
			break;
		case "P12":
			//			current = "P12";
			moveMe('P11', 0);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			break;
		case "P13":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//			current = "P13";
			break;
		case "P21":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			//moveMe('P21',3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//		current = "P21";
			$("#P21img").attr('src', 'images/img1.png');
			break;
		case "P22":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//		current = "P22";
			$("#P22img").attr('src', 'images/img3.png');
			break;
		case "P23":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P31', 6);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//			current = "P23";
			break;
		case "P31":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			//moveMe('P21',3);
			moveMe('P32', 7);
			moveMe('P33', 8);
			//			current = "P31";
			$("#P21img").attr('src', 'images/img1.png');
			break;
		case "P32":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P33', 8);
			//			current = "P32";
			$("#P22img").attr('src', 'images/img3.png');
			break;
		case "P33":
			moveMe('P11', 0);
			moveMe('P12', 1);
			moveMe('P13', 2);
			moveMe('P21', 3);
			moveMe('P22', 4);
			moveMe('P23', 5);
			moveMe('P31', 6);
			moveMe('P32', 7);
			//			current = "P33";
			break;
	}
	*/

	moveMe('P11', 0);
	moveMe('P12', 1);
	moveMe('P13', 2);
	moveMe('P21', 3);
	moveMe('P22', 4);
	moveMe('P23', 5);
	moveMe('P31', 6);
	moveMe('P32', 7);
	moveMe('P33', 8);



	winNum = getWinNum(iidd);

	$('#' + iidd).animate({
		width: '310px',
		height: '270px'
	}, function () {
		window.frames[winNum].frameElement.contentWindow.changeSize();
		if (openID != iidd) {
			openMe(openID);
		}
	});

	$('#' + current).find('.zoomButton').attr('src', 'images/plus.png');
	$(".footer").css('top', '960px');

}

var pArray = [[0, 0], [320, 0], [640, 0], [0, 280], [320, 280], [640, 280], [0, 560], [320, 560], [640, 560],
			 [0, 840], [320, 840], [640, 840], [0, 1120], [320, 1120], [640, 1120]];

function moveMe(boxID, posID) {
	//if ($('#' + boxID).length > 0) {
	shrink(boxID);
	$('#' + boxID).animate({
		left: (pArray[posID][0] + 'px'),
		top: (pArray[posID][1] + 'px')
	});
	//}
}

function expand(boxID) {
	var WW = $('#' + boxID).css('width');
	WW = parseInt(WW.replace("px", ""));
	if (WW < 400) {
		$('#' + boxID).animate({
			width: '620px',
			height: '540px'
		});
	}
}

function shrink(boxID) {
	// //console.log('inside shrink() : ' + boxID);
	var WW = $('#' + boxID).css('width');
	WW = parseInt(WW.replace("px", ""));
	if (WW > 400) {
		/*
		$('#' + boxID).animate({
			width: '310px',
			height: '270px'
		}, function () {
			switch (boxID) {
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
				case "P31":
					window.frames[6].frameElement.contentWindow.showMyContents();
					break;
				case "P32":
					window.frames[7].frameElement.contentWindow.showMyContents();
					break;
				case "P33":
					window.frames[8].frameElement.contentWindow.showMyContents();
					break;
			}
		});
		*/
		$('#' + boxID).find('.zoomButton').attr('src', 'images/plus.png');
	}
}

function dFormat1(str) {
	//console.log("dFormat1.str=" + str);
	var M = parseInt(str.substr(4, 2));
	var D = parseInt(str.substr(6, 2));
	var H = str.substr(8, 2);
	var mm = str.substr(10, 2);
	return M + "月" + D + "日";
}

function dFormat2(str) {
	//console.log("dFormat2.str=" + str);
	var M = parseInt(str.substr(4, 2));
	var D = parseInt(str.substr(6, 2));
	var H = str.substr(8, 2);
	var mm = str.substr(10, 2);
	return H + ":" + mm; // + "0";
}

function xsort(sqs, col, order) {
	//二次元配列のソート
	//col:並べ替えの対象となる列
	//order:1=昇順、-1=降順
	sqs.sort(function (a, b) {
		return ((a[col] - b[col]) * order);
	});
	return (sqs);
}
