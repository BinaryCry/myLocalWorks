$ = function($){
	return $;
}(jQuery);

document.http = new http();

// MAIN
$( function(){
	O = new Object({url:'data/data.json'});
	document.http.request(O).then(
		function(res){
			parseShedule(res);
		},
		function(err){
			console.log(err);
		}
	);
	function parseShedule(jsonData){
		var days = $('.days').parent();
		var daysNamesShort = Object.keys(jsonData);
		for (var i=0; i<daysNamesShort.length; i++) {
			if(jsonData[daysNamesShort[i]].length > 0) {
				var currentDay = jsonData[daysNamesShort[i]];
				for (var j in currentDay) {
					if( !currentDay.hasOwnProperty(j) ) continue;
					else {
						if( validData(currentDay[j]['bt'],currentDay[j]['et']) ) {
							var day = days.eq(checkDay(daysNamesShort[i]));
							var startP = Math.ceil(currentDay[j]['bt']/60+1);
							var endP   = Math.ceil(currentDay[j]['et']/60);
							if (startP == 1 && endP == 24) day.children('.active24').children('.fa').removeClass('hidden');
							for (var k = startP; k <= endP; k++) {
								day.children('.days').addClass('activeBG');
								day.children('.oneHour').eq(k-1).addClass('activeBG');
							}
						} else {
							console.log('Incorrect data on "'+daysNamesShort[i].toUpperCase()+'"');
						}
					}
				}
			}
		}
	}
	function checkDay(short){
		switch(short) {
			case 'mo' : return 0;
			case 'tu' : return 1;
			case 'we' : return 2;
			case 'th' : return 3;
			case 'fr' : return 4;
			case 'sa' : return 5;
			case 'su' : return 6;
			default   : return false;
		}
	}
	function validData(start,end){
		return (start < 0 && start > 1370) || (end < 60 && end > 1439) || (start > end) ? false : true;
	}
} );


// --------------------- Dev
// Promise for AJAX
function http() {
	this.hint = 'url,queryType,dataType,async,data,timeout\n\nПри передаче данных в виде аргументов следует соблюдать их порядок, как в примере выше\n\nИмя свойств в передаваемом объекте должны быть одноименны с названиями аргументов в примере выше';
	this.control = false;
	this.lastQuery = false;
	this.config = new Object();
	this.defined = {
		url       : '',
		queryType : 'POST',
		dataType  : 'json',
		async     : true,
		data      : false,
		timeout   : 500
	}
	this.log = new Array();
	this.log.console =  true;
	this.log.show = function(){
		for (var i=0; i<this.length; i++) {
			console.log(this[i]);
		}
	}
	this.log.clean = function(){
		this.splice( 0,this.length );
	}
	this.fromObject = function(arg) {
		if( arg != null && typeof(arg) == 'object' && arg.url != undefined ) {
			this.control = true;
			this.config.url                       = arg.url;
			arg.queryType ? this.config.queryType = arg.queryType : this.config.queryType = this.defined.queryType;
			arg.dataType  ? this.config.dataType  = arg.dataType  : this.config.dataType  = this.defined.dataType;
			arg.async     ? this.config.async     = arg.async     : this.config.async     = this.defined.async;
			arg.data      ? this.config.data      = arg.data      : this.config.data      = this.defined.data;
			arg.timeout   ? this.config.timeout   = arg.timeout   : this.config.timeout   = this.defined.timeout;
		} else {
			if( typeof(arg) == 'string' ) { this.fromArguments(new Array(arg)) }
		}
	}
	this.fromArguments = function(args) {
		if ( !args[0] ) { console.error('No URL'); return false }
			else { this.config.url = args[0]; this.control = true; }
		if ( args[1] === undefined ) this.config.queryType = this.defined.queryType;
			else this.config.queryType = args[1];
		if ( args[2] === undefined ) this.config.dataType  = this.defined.dataType;
			else this.config.dataType = args[2];
		if ( args[3] === undefined ) this.config.async     = this.defined.async;
			else this.config.async = args[3];
		if ( args[4] === undefined ) this.config.data      = this.defined.data;
			else this.config.data = args[4];
		if ( args[5] === undefined ) this.config.timeout   = this.defined.timeout;
			else this.config.timeout = args[5];
	}
	this.router = function(ARGS){
		switch( ARGS.length ) {
			case 0  : this.lastQuery ? this.control = true : 0; break;
			case 1  : this.fromObject(ARGS[0]); break;
			default : this.fromArguments(ARGS);
		}
	}
	this.request = function() {
		this.router(arguments);
		if( this.control ) {
			return new Promise( function(resolve,reject) {
				$.ajax({
					timeout  : document.http.config.url,
					url      : document.http.config.url,
					type     : document.http.config.queryType,
					dataType : document.http.config.dataType,
					async    : document.http.config.async,
					data     : document.http.config.data,
					success  : function( data, control ) { document.http.lastQuery = true; resolve(data) },
					error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.controlText; reject(errorMessage); },
					complete : function() {
						document.http.control = false;
						var msg = 'Request to ' + document.http.config.url+ ' completed'
						if ( document.http.log.console ) console.log(msg);
						document.http.log.push(msg);
					}
				})
			} )
		} else {
			console.error('Cannot to request'); return false;
		}
	}
}