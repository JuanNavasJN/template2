<?php
$to ='PandaPipsEA@gmail.com';
$subject = "Contacto de <". $_POST['email'] .">";
$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'From: Your name' . $_POST['email'] . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

$message = "
<html>
<head>
<title>PandaPipsEA MAIL</title>
</head>
<body>
<h1>Nombre: ".$_POST['name']."</h1>
<p>".$_POST['message']."</p>
</body>
</html>";
 
mail($to, $subject, $message, $headers);