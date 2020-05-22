<?php
$to ='PandaPipsEA@gmail.com';
$subject = "Contacto de ". $_POST['cemil'];
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
 
$message = "
<html>
<head>
<title>PandaPipsEA MAIL</title>
</head>
<body>
<h1>Esto es un H1</h1>
<p>".$_POST['cmessages']."</p>
</body>
</html>";
 
mail($to, $subject, $message, $headers);