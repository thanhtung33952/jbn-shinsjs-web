/*
function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(36.035075,138.1072361)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var kmlLayer = new google.maps.KmlLayer({
	url: 'http://menius.org/Suwa2.kml'
  });
  kmlLayer.setMap(map);
  var cloudLayer = new google.maps.weather.CloudLayer();
  cloudLayer.setMap(map);

}
*/

/* Default View: Large size */
function moreMap() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(36.035075,138.1172361)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas2'),
      mapOptions);
  /* When kml layer exists zoom has ignored.  */
  var kmlLayer = new google.maps.KmlLayer({
	url: 'http://menius.org/Suwa2.kml'
  });
  kmlLayer.setMap(map);
}

function moreMap21() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(36.035075,138.1172361)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas21'),
      mapOptions);
  /* When kml layer exists zoom has ignored.  */
  var kmlLayer = new google.maps.KmlLayer({
	url: 'http://menius.org/Suwa2.kml'
  });
  kmlLayer.setMap(map);
  
}

function moreMap2() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(36.035075,138.1172361)
  };
  var mPoint = new google.maps.LatLng(36.035075,138.1172361);
  var map = new google.maps.Map(document.getElementById('map-canvas2'),
      mapOptions);
  /* When kml layer exists zoom has ignored.  */
  var kmlLayer = new google.maps.KmlLayer({
	url: 'http://menius.org/Suwa2.kml'
  });
  kmlLayer.setMap(map);
  
var marker=new google.maps.Marker({
  position:mPoint,
  });

marker.setMap(map);

var contentStr = '<p>ここに測定データを表示します。<br /><img src="images/data1.png" /></p>';

var infowindow = new google.maps.InfoWindow({
  content: contentStr,
  position: mPoint
  });

infowindow.open(map);


}
/*fullScreen*/
function moreMap3() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(36.035075,138.1172361)
  };
  var mPoint = new google.maps.LatLng(36.035075,138.1172361);
  var map = new google.maps.Map(document.getElementById('fullMap2'),
      mapOptions);
  /* When kml layer exists zoom has ignored.  */
  var kmlLayer = new google.maps.KmlLayer({
	url: 'http://menius.org/Suwa2.kml'
  });
  kmlLayer.setMap(map);
 /* 
var marker=new google.maps.Marker({
  position:mPoint,
  });

marker.setMap(map);
*/
var contentStr = '<p>ここに測定データを表示します。<br /><img src="images/data1.png" /></p>';

var infowindow = new google.maps.InfoWindow({
  content: contentStr,
  position: mPoint
  });

infowindow.open(map);


}



//google.maps.event.addDomListener(window, 'load', initialize);



