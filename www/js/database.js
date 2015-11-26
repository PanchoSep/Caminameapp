$(document).on('pageshow','#login',function(){
    $("#errorMsg").hide();
    $("#btnLogin").click(function(){
    	//$.mobile.changePage("#bar");
        var usu = $("#txtuser").val();
        var pass = $("#txtpassword").val();
        $.post("http://192.168.43.103:80/caminamedb/users_db.php",{ usu : usu, pass : pass},function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage("#bar");
            }
            else{
              //por mientras que no arregle login dejar así
              	//$.mobile.changePage("#bar");
              	//descomentar cuando esté listo
                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });
});