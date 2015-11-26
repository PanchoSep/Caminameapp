var map;
var marker;
var infowindow;
var watchID;
var datos;
//var datos[];

$(document).on('pageshow','#bar',function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    onDeviceReady();
});
 
//PhoneGap is ready function
function onDeviceReady() {
    //$(window).unbind();
    //$(window).bind('pageshow resize orientationchange', function(e){
    
    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
}
 //Funcion que mantiene el mapa ajustado a la pantalla
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

    
     
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        $.getJSON('http://192.168.43.103:80/caminamedb/puntos_db.php',function(data){
        //Guardamos los datos de los puntos para usarlos despues
        datos=$.parseJSON(JSON.stringify(data));

        //datos=data;
        for (var i=0;i<data.length;i++){
            //alert(data[i].nombre);

            var punto = new google.maps.LatLng(data[i].latitud, data[i].longitud);
            marcador = new google.maps.Marker({
            position: punto,
            icon:'img/city.png',
            map: map
        });
        }

    });
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });   
    }); 
}
 
function geo_error(error){
    //comment
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
 
function geo_success(position) {
     
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);
 
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //create marker
        marker = new google.maps.Marker({
            position: point,
            icon:'img/gps.png',
            map: map
        });
    }else{
        //move marker to new position
        marker.setPosition(point);
    }
    
    //Comparamos la distancia entre el dispositivo y los marcadores
    for(var i=0;i<datos.length;i++){
        var dist=distance(position.coords.latitude, position.coords.longitude,datos[i].latitud,datos[i].longitud);
        if(dist<0.07){
            //$.mobile.changePage('#pops', 'pop', true, true);
           launch("trivia");

            
        }
    }
    
    
    //alert(datos[0].nombre);


}
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
