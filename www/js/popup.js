

  
        var PARSE_APP ="xSoXrxrcic8dufilndWv5hE4naQy6kQ67G6IlPwi";
		var PARSE_JS = "UODhEg3X7gIoeEoRYkAdH335zYSVcoD9YCqqilF7";
        var respuestaCorrecta;


		//Funcion para crear la trivia
        function launch() {
            Parse.initialize(PARSE_APP, PARSE_JS);
			var triviaObject= Parse.Object.extend("trivia");
			var query = new Parse.Query(triviaObject);
			query.find({
				success:function(resultado){
					var numPregunta=Math.floor(Math.random() * resultado.length);
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
       
        
        
 		//al pinchar alternativa
        function alternativa(resp) {
            //RIGHT
			
            if (resp == respuestaCorrecta) {
				
                //ion.sound.play("glass"); 
                //$(current).addClass('greenBtn');
                $("#trivia").popup("close");
                
                correcta();
                
            }
            //WRONG
            else {
                
                //$(current).addClass('redBtn');
                $("#trivia").popup("close");
               
                incorrecta();
            }
        }



        //si es incorrecto
        function incorrecta() {
            setTimeout(function () {
                $('#resultado h1').html("¡Incorrecto!");
                $('#resultado div.ui-content p').html("Te has equivocado");
                $("#resultado").popup("open");
            }, 600);
        }

/		//si es correcto
        function correcta() {
                        
            setTimeout(function () {
                $('#resultado h1').html("¡Correcto!");
                $('#resultado div.ui-content p').html("Muy Bien!");
                $("#resultado").popup("open");
            }, 600);
        }
        
/*** Multiple Choice RERUN SAME QUIZ DATA ***/ 
		
	