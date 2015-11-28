      
        var PARSE_APP ="xSoXrxrcic8dufilndWv5hE4naQy6kQ67G6IlPwi";
		var PARSE_JS = "UODhEg3X7gIoeEoRYkAdH335zYSVcoD9YCqqilF7";
		
        var respuestaCorrecta;


// FUNCION QUE CREA Y MUESTRA LA TRIVIA
        function launch() {
			
			//SE INICIALIZA PARSE PARA EXTRAER LA TRIVIA DEL SERVIDOR
            Parse.initialize(PARSE_APP, PARSE_JS);
			var triviaObject= Parse.Object.extend("trivia");
			var query = new Parse.Query(triviaObject);
			query.find({
				success:function(resultado){
					//SE ELIGE UN NUMERO AL AZAR ENTRE LA CANTIDAD DE TRIVIAS
					var numPregunta=Math.floor(Math.random() * resultado.length);
					// SE CREA EL FORMATO DE LA TRIVIA RELLENENANDO CON LOS DATOS 
					// QUE SE EXTRAJERON DEL SERVIDOR PARSE
					$('#trivia div.ui-content a').removeClass('greenBtn');
                $('#trivia div.ui-content a').removeClass('redBtn');
                $('#trivia h1').html("Trivia");
                $('#trivia div.ui-content p').html(resultado[numPregunta].get("pregunta"));
                $('#trivia div.ui-content a#1').html(resultado[numPregunta].get("alt1"));
                $('#trivia div.ui-content a#2').html(resultado[numPregunta].get("alt2"));
                $('#trivia div.ui-content a#3').html(resultado[numPregunta].get("alt3"));
				respuestaCorrecta = resultado[numPregunta].get("altcorr");
				
				
         
					
					},
				error:function(error){
					alert("erro obteniendo de la base de datos");
					}
				});
		                                 
                $('#trivia').popup("open");
                
            
        }
       
          // FUNCION QUE SE EJECUTA AL PRESIONAR UNA ALTERNATIVA DEL POPUP
        function alternativa(current) {
            	
			// VERIFICA SI LA ALTERNATIVA ES CORRECTA
            if (current == respuestaCorrecta) {
				
               
                $("#trivia").popup("close");
                
                correcta();
                
            }
            
            else {
                
                $("#trivia").popup("close");
               
                incorrecta();
            }
        }



        

        

		// FUNCION QUE SE EJECUTA SI LA RESPUESTA ES INCORRECTA
        function incorrecta() {
            setTimeout(function () {
                $('#resultado h1').html("¡Incorrecto!");
                $('#resultado div.ui-content p').html("Te has equivocado");
                $("#resultado").popup("open");
            }, 600);
        }
		
 		// FUNCION QUE SE EJECUTA SI LA RESPUESTA ES CORRECTA
        function correcta() {
                        
            setTimeout(function () {
                $('#resultado h1').html("¡Correcto!");
                $('#resultado div.ui-content p').html("Muy Bien!");
                $("#resultado").popup("open");
            }, 600);
        }
        
 
		
	