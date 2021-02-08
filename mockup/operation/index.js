var invMethod, invAttend, buildCer, buildApp, buildStr, buildFloor, buildPre, buildType, buildUse;
var baseType, baseSch, carrySlope, carrySta, carryBar, optApp, optEye, optJibangoo, claApp, claDur;
var estimate;

function setHeight(){
//	var HH = parseInt(window.innerHeight - 170) + 'px';
/*	var HH = $(".centerPane").css('height');
	//$('.contentContainer').css('height', HH);
	$('.centerPane').css('height', HH);
	$('.leftPane').css('height', HH);
	$('.mainPane').css('height', HH);
	$('.rightPane').css('height', HH);
	console.log('...' + HH);*/
	var HH = 'auto';
	$('.centerPane').css('height', HH);
	$('.leftPane').css('height', HH);
	$('.mainPane').css('height', HH);
	$('.rightPane').css('height', HH);
	/*console.log('...' + HH);*/

}
/*
function openDate(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}*/

function openDate(type){
	console.log(type);
	$(".tabcontent").hide();
	$("#" + type).show();
	
	$(".tablinks").removeClass('tabSelected');
	switch (type){
		case "day-time":
			$("#inv-tab-1").addClass('tabSelected');
			break;
		case "any":
			$("#inv-tab-2").addClass('tabSelected');
			break;
		case "nearest":
			$("#inv-tab-3").addClass('tabSelected');
			break;
			
				}
	
}

$(document).ready(function(){
	setHeight();
	
	$(".rightContent").hide();
	$("#rightPaneTitle").text("");
	

	$(".flashLeft").click(function(){
		var me = $(this).attr('id');
		console.log('flashLeft = ' + me);
		$(".rightContent").hide();
		$("#rightPaneTitle").text("");
		me = me.replace('-icon','');
		if($("#" + me).css('height') == '60px'){
			console.log('fire to open');
			$("#" + me).removeClass('closed');
			var title="", iidd;
			switch (me){
			/*	case "AJA-1":
					title="お申込者";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-2":
					title="地盤品質証明事業者";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-3":
					title="物件情報";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-4":
					title="調査希望内容";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-5":
					title="物件概要";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-6":
					title="予定基礎";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-7":
					title="搬入条件、高さ障害";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-8":
					title="オプションサービス";
					iidd = me.replace('AJA-','r');
					break;*/
				case "AJA-9":
					title="添付書類";
					iidd = me.replace('AJA-','r');
					break;
			/*	case "AJA-10":
					title="連絡事項";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-11":
					title="申込区分";
					iidd = me.replace('AJA-','r');
					break;
				case "AJA-12":
					title="改良工事判定の場合";
					iidd = me.replace('AJA-','r');
					break;*/
				default:
					title="「地盤安心住宅」について...";
					iidd = 'r0';
					  }
			$("#rightPaneTitle").text(title);
			$("#" + iidd).show();
			setHeight();
		}
		else {
			console.log('fire to 60');
			$("#" + me).addClass('closed');
			$("#rightPaneTitle").text("「地盤安心住宅」について");
			$("#r0").show();
			
		}
	})
	
	$(".inv-method").click(function(){
		$(".inv-method").removeClass('sSelected');
		$(this).addClass('sSelected');
		invMethod = $(this).text();
	})
	
	$(".inv-attend").click(function(){
		$(".inv-attend").removeClass('sSelected');
		$(this).addClass('sSelected');
		invAttend = $(this).text();
	})

	$(".build-cer").click(function(){
		$(".build-cer").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildCer = $(this).text();
	})

	$(".build-app").click(function(){
		$(".build-app").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildApp = $(this).text();
	})
	
	$(".build-str").click(function(){
		$(".build-str").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildStr = $(this).text();
	})
	
	$(".build-floor").click(function(){
		$(".build-floor").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildFloor = $(this).text();
	})
	
	$(".build-pre").click(function(){
		$(".build-pre").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildPre = $(this).text();
	})
	
	$(".build-type").click(function(){
		$(".build-type").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildType = $(this).text();
	})
	
	$(".build-use").click(function(){
		$(".build-use").removeClass('sSelected');
		$(this).addClass('sSelected');
		buildUse = $(this).text();
	})
	
	$(".base-type").click(function(){
		$(".base-type").removeClass('sSelected');
		$(this).addClass('sSelected');
		baseType = $(this).text();
	})
	
	$(".base-sch").click(function(){
		$(".base-sch").removeClass('sSelected');
		$(this).addClass('sSelected');
		baseSch = $(this).text();
	})
	
	$(".carry-slope").click(function(){
		$(".carry-slope").removeClass('sSelected');
		$(this).addClass('sSelected');
		carrySlope = $(this).text();
	})
	
	$(".carry-sta").click(function(){
		$(".carry-sta").removeClass('sSelected');
		$(this).addClass('sSelected');
		carrySta = $(this).text();
	})
	
	
	$(".carry-bar").click(function(){
		$(".carry-bar").removeClass('sSelected');
		$(this).addClass('sSelected');
		carryBar = $(this).text();
	})
	
	$(".opt-app").click(function(){
		$(".opt-app").removeClass('sSelected');
		$(this).addClass('sSelected');
		optApp = $(this).text();
	})
	
	$(".opt-eye").click(function(){
		$(".opt-eye").removeClass('sSelected');
		$(this).addClass('sSelected');
		optEye = $(this).text();
	})
	
	$(".opt-jibangoo").click(function(){
		$(".opt-jibangoo").removeClass('sSelected');
		$(this).addClass('sSelected');
		optJibangoo = $(this).text();
	})
	
	$(".cla-app").click(function(){
		$(".cla-app").removeClass('sSelected');
		$(this).addClass('sSelected');
		claApp = $(this).text();
	})
	
	$(".cla-dur").click(function(){
		$(".cla-dur").removeClass('sSelected');
		$(this).addClass('sSelected');
		claDur = $(this).text();
	})
	
	$(".estimate").click(function(){
		$(".estimate").removeClass('sSelected');
		$(this).addClass('sSelected');
		estimate = $(this).text();
	})
	
	$(".upload-item").click(function(){
		$(".upload-item").removeClass('sSelected');
		$(this).addClass('sSelected');
		estimate = $(this).text();
	})
	
	$("#pro-address-1").focus(function(){
		$("#moreInfo").show();
	})
	
	
	$(".menuItem").click(function(){
		$(".menuItem").removeClass('selected');
		var id = $(this).attr('id');
		if( id == "item2") {
			$(".main").show();
			$(".right").show();
			$(".morePage").hide();			
		 }
		else {
			$(".main").hide();
			$(".right").hide();
			$("#moreImg").attr('src','img/' + id + '.png');
			$(".morePage").show();		
		}
		$("#" + id).addClass('selected');
	})
})