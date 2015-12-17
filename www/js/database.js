var PARSE_APP ="xSoXrxrcic8dufilndWv5hE4naQy6kQ67G6IlPwi";
var PARSE_JS = "UODhEg3X7gIoeEoRYkAdH335zYSVcoD9YCqqilF7";

$(document).on('pageshow','#login',function(){
   // $("#errorMsg").hide();
    $("#botonLogin").click(function(){
		
		var login= false;
		// SE EXTRAEN LOS DATOS PUESTOS EN LOS CAMPOS DE TEXTO
        var usu = $("#userinput").val();
        var pass = $("#passinput").val();
		var datos;
		
		// SE INICIALIZA PARSE PARA EXTRAER LOS DATOS DE LOS USUARIOS DE LA BASE DE DATOS
		Parse.initialize(PARSE_APP, PARSE_JS);
		
		var usuariosObject= Parse.Object.extend("usuarios");
		
		
		var query = new Parse.Query(usuariosObject);
		query.find({
			success: function(resultados){
				// SE COMPARA LOS DATOS DEL LOS CAMPOS DE TEXTO CON LOS DE LA BASE DE DATOS PARA VALIDAR AL USUARIO
				for(var i=0;i<resultados.length;i++){
					if(resultados[i].get("usuario")==usu && resultados[i].get("contrasena")==pass){
						login=true;
						}
					}
					if(login==true){
						//SI EL LOGUEO ES POSITIVO SE CAMBIA AL LA PAGINA DEL MAPA
						$.mobile.changePage("#bar");
					}else{
						//$.mobile.changePage('#logerror', 'pop', true, true);		
						$("#logerror").popup("open");
					}
				
				},
				error:function(error){
					alert("error obteniendo base de datos");
					}
			
			
			});
    });  
});