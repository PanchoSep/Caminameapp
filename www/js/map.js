var PARSE_APP ="xSoXrxrcic8dufilndWv5hE4naQy6kQ67G6IlPwi";
var PARSE_JS = "UODhEg3X7gIoeEoRYkAdH335zYSVcoD9YCqqilF7";
var query;
var inst=" ";
var map;
var marker;
var infowindow;
var watchID;
var datos;
//var datos[];

$(document).on('pageshow','#bar',function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
});
 
//FUNCION QUE SE EJECUTA UNA VEZ QUE EL DISPOSITIVO Y PHONEGAP ESTÉ LISTO
function onDeviceReady() {

    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
}
 //FUNCION PARA MANTENER EL MAPA AJUSTADO A LA PANTALLA
function max_height(){
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();
    
    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    } 
    $.mobile.activePage.find('[data-role="content"]').height(content_height);
}
         
	//FUNCION QUE INICIALIZA EL MAPA
function map(){
    var latlng = new google.maps.LatLng(55.17, 23.76);
    var myOptions = {
      zoom: 6,
      center: latlng,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    
     //UNA VEZ QUE ESTÉ INCIALIZADO EL MAPA SE EJECUTA LO SIGUIENTE
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
	
	// SE INICIALIZA PARSE PARA EXTRAER LOS MARCADORES DESDE LA BASE DE DATOS
	Parse.initialize(PARSE_APP, PARSE_JS);
		
		var puntosObject= Parse.Object.extend("puntos");
		
		
		query = new Parse.Query(puntosObject);
		query.find({
			success:function(resultados){
				// RECORRE LA BASE DE DATOS DE MARCADORES Y LOS APLICA EN EL MAPA
				for (var i=0;i<resultados.length;i++){
            //alert(data[i].nombre);

            var punto = new google.maps.LatLng(resultados[i].get("latitud"), resultados[i].get("longitud"));
            marcador = new google.maps.Marker({
            position: punto,
            icon:'img/city.png',
            map: map
        });
        }
				},
			error:function(error){
				alert("error obteniendo base de datos");
				}
			});
        
        //PARA OBTENER LA GEOLOCALIZACIÓN UNA VEZ 
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //PARA BUSCAR GEOLOCALIZACION CONSTANTE
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });   
    }); 
}
 
function geo_error(error){
    //comment
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
 
 // LA GEOLOCALIZACIÓN ES VALIDA
function geo_success(position) {
     
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);
 
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //SE CREA MARCADOR EN LA POSICION DEL DISPOSITIVO
        marker = new google.maps.Marker({
            position: point,
            icon:'img/gps.png',
            map: map
        });
    }else{
        //SE MUEVE EL MARCADOR A LA POSICION ACTUALIZADA
        marker.setPosition(point);
    }
	
    query.find({
			success:function(resultados){
				
				for (var i=0;i<resultados.length;i++){
        			//SE LLAMA A LA FUNCION DISTANCE() PARA COMPARAR DISTANCIA ENTRE EL DISPOSITIVO Y LOS MARCADORES
					var dist=distance(position.coords.latitude, position.coords.longitude,resultados[i].get("latitud"),resultados[i].get("longitud"));
					// SI LA DISTANCIA ES MENOR A 70 MTS DE UN PUNTO SE EJECUTA EL POPUP DE TRIVIA
        			if(dist<0.07){
						if(inst == resultados[i].get("objectId")){
							//no hace nada porque ya realizó la trivia de este punto 
							}
						else{
							inst=resultados[i].get("objectId");
							launch();
							}            
        				}
        			}
				},
			error:function(error){
				alert("error obteniendo base de datos");
				}
			});
    
    
    



}
//FUNCION QUE CALCULA DISTANCIA ENTRE DOS PUNTOS
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
