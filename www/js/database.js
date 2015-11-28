var PARSE_APP ="xSoXrxrcic8dufilndWv5hE4naQy6kQ67G6IlPwi";
var PARSE_JS = "UODhEg3X7gIoeEoRYkAdH335zYSVcoD9YCqqilF7";

$(document).on('pageshow','#login',function(){
    $("#errorMsg").hide();
    $("#botonLogin").click(function(){
		
    	//$.mobile.changePage("#bar");
		var login= false;
        var usu = $("#userinput").val();
        var pass = $("#passinput").val();
		var datos;
		Parse.initialize(PARSE_APP, PARSE_JS);
		
		var usuariosObject= Parse.Object.extend("usuarios");
		
		
		var query = new Parse.Query(usuariosObject);
		query.find({
			success: function(resultados){
				for(var i=0;i<resultados.length;i++){
					if(resultados[i].get("usuario")==usu && resultados[i].get("contrasena")==pass){
						login=true;
						}
					}
					if(login==true){
						$.mobile.changePage("#bar");
					}else{
						$.mobile.changePage('#pageError', 'pop', true, true);		
					}
				
				},
				error:function(error){
					alert("error obteniendo base de datos");
					}
			
			
			});
    });  
});