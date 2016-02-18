/* CONSTRUCTOR */
function creatMap (zoom, adressGroup, element) {
	/* MAP INITIALIZING AND CUSTOMIZING */		
	var MAP;
	var pointStyle = 'islands#darkGreenDotIcon';
		
	ymaps.ready(init);
		
	function init() {
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