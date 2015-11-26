<?php
header('Content-type: application/json');
$server = "localhost";
$username = "root@localhost";
$password = "";
$database = "caminame";
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$usu = mysql_real_escape_string($_POST["usu"]);
$pass = mysql_real_escape_string($_POST["pass"]);
 
$sql = "SELECT nom_usu FROM usuarios WHERE nom_usu='$usu' AND pass_usu='$pass'";
 
if ($resultado = mysql_query($sql, $con)){
    if (mysql_num_rows($resultado) > 0){
        echo true;
    }
}
else{
    echo false;
}
mysql_close($con);
 
?>