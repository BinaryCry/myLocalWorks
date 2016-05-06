/* SINGLE MAP */
$( function() {			
			$('.body').on('click','.address', function() {
			 $('.showMap').empty().hide();
             $('.mapBox').remove();
             var h="<div onclick='removeMap();'><button>Спрятать</button></div>";
			  h+="<div id='mapBox' style='width:100%; height: 180px;'></div>";             
			 $(this).parent().find('.showMap').eq( 0 ).show().html(h);
            		var DATA = [
				{
					hint: $(this).html(),
					balloon: $(this).html()
				}]
            creatMap(12,DATA,'mapBox');
			} );
		} );
function removeMap(){$('.showMap').empty().hide();$('.mapBox').remove();}



/* CONSTRUCTOR */
function creatMap (zoom, adressGroup, element) {
 /* MAP INITIALIZING AND CUSTOMIZING */  
 var MAP;
 var pointStyle = 'islands#darkGreenDotIcon';
  
 ymaps.ready(init);
  
 function init() {
  MAP = new ymaps.Map(element, { center: [50.450361, 30.523639], zoom: zoom} );
  MAP.setType('yandex#map');
  MAP.controls.remove('geolocationControl');
  MAP.controls.remove('searchControl');
  MAP.controls.remove('trafficControl');
  MAP.controls.remove('rulerControl');
 /* CORE */  
  myCollection = new ymaps.GeoObjectCollection({}, {
   preset: 'islands#darkGreenDotIcon'
  });
   
  for (var i in adressGroup) {
   geocoder(adressGroup[i],myCollection);
  };

  MAP.geoObjects.add(myCollection);
  if(adressGroup){
    geocoderForCentr(adressGroup[adressGroup.length-1].hint, MAP);
  }
 };
}

/* GEOCODER */	
function geocoder(dataObject, collectionObject) {
	var myGeocoder = ymaps.geocode(dataObject.hint);
	myGeocoder.then(
		function (res) {
			collectionObject.add(new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {hintContent: dataObject.hint, balloonContent: dataObject.balloon}, {balloonPane: 'outerBalloon'}));
		},
		function (err) {
			// alert('error');
			}
	);
}
/* GEOCODER FOR CENTER */	
function geocoderForCentr(addr, mapObject) {
	var myGeocoder = ymaps.geocode(addr);
	myGeocoder.then(
		function (res) {
			mapObject.setCenter( res.geoObjects.get(0).geometry.getCoordinates() );
		},
		function (err) {
			// alert('error');
			}
	);
}