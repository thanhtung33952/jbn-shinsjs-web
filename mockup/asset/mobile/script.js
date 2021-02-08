	$(function() {
	    $('#goTop').click(function(){
                //window.scrollTo(0, 0);
                $('html').animate({scrollTop:0}, 'slow');//IE, FF
                $('body').animate({scrollTop:0}, 'slow');//chrome, don't know if safary works
            });
            
            $("#pageTop2").click(function(){
                $(location).attr('href', 'index.html');
            });
            $("#again").click(function(){
                $(location).attr('href', 'm_again.html');
            });
            $("#anchor").click(function(){
                $(location).attr('href', 'm_anchor.html');
            });
            $("#color").click(function(){
                $(location).attr('href', 'm_color.html');
            });
            $("#contents").click(function(){
                $(location).attr('href', 'm_contents.html');
            });
            $("#news").click(function(){
                $(location).attr('href', 'news.html');
            });
            $("#tsudoi").click(function(){
                $(location).attr('href', 'm_tsudoi.html');
            });
            $("#profile").click(function(){
                $(location).attr('href', 'profile.html');
            });
            $("#order").click(function(){
                $(location).attr('href', 'http://shop.nhk-sc.or.jp/shop/g/g010220150/');
            });
            
            $("#_anchor_3").click(function(){
               $(location).attr('href', 'profile.html');
             });
            $("#_anchor_2").click(function(){
               $(location).attr('href', 'profile2.html');
             });
            
            $("#_more1").click(function(){
               $(location).attr('href', 'song.html'); 
            });
            $("#_more2").click(function(){
               $(location).attr('href', 'fromEditor.html'); 
            });
            $("#_more3").click(function(){
               $(location).attr('href', 'ikku.html'); 
            });
            $("#_more4").click(function(){
               $(location).attr('href', 'yumezo.html'); 
            });
            $("#backNumber").click(function(){
               $(location).attr('href', 'backNumber.html'); 
            });
            $("#_more6").click(function(){
               $(location).attr('href', 'qanda.html'); 
            });
            
 
            /* Backnumber calling 
            $(".no148").click(function(){
                $(".bNumber").text(dataArray[0]);
                $(".article1_1").text(dataArray[1][0]);
                $(".article1_2").text(dataArray[1][1]);
                $(".article2_1").text(dataArray[2][0]);
                $(".article2_2").text(dataArray[2][1]);
                $(".article3_1").text(dataArray[3][0]);
                $(".article3_2").text(dataArray[3][1]);
                $(".article4_1").text(dataArray[4][0]);
                $(".article4_2").text(dataArray[4][1]);
                $(".article5_1").text(dataArray[5][0]);
                $(".article5_2").text(dataArray[5][1]);
                $(".bCover").attr('src','images/cover/no148.jpg');
            });
            */
	});
