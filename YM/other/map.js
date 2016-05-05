/* GET ALL AND SHOW */
$( function() {				
	$('#showMapAll').on('click',function() {
		$('#mapBox').remove();
							
		$('#search_content').html( $('#search_content').html() + '<div id="showMap" style="width: 400px; height: 300px; background-color: #f00;"> </div>'  );
							
							
		var DATA = new Array();
		$('.price_block').each( function() {
		DATA.push( {  
			hint : $(this).find('.address').text(), 
			baloon : $(this).find('.address').text(), 
			blockId : $(this).attr('id') } );
		} );

			creatMap(10,DATA,'showMap');

	});
						
});

/* SINGLE MAP */
$( function() {			
			$('.address').on('click', function() {
			 $('#mapBox').remove();
			 var h="<div id='mapBox' style='width:100%;height:200px'></div>";             
			 $(this).parent().find('.showMap').eq( 0 ).html(h);
            		var DATA = [
				{
					hint: $(this).html(),
					balloon: $(this).html()
				}]
            creatMap(12,DATA,'mapBox');
			} );	
			
		} );
    
/* CONSTRUCTOR */
function creatMap (zoom, adressGroup, element) {
	/* MAP INITIALIZING AND CUSTOMIZING */
	console.log(adressGroup);
	var MAP;
	var pointStyle = 'islands#darkGreenDotIcon';
	
		MAP = new ymaps.Map(element, { center: [50.450361, 30.523639], zoom: zoom} );
		MAP.setType('yandex#publicMap');
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