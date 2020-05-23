<?php

require_once('./vendor/autoload.php');

\Stripe\Stripe::setApiKey('sk_test_ZeshMvUJl9MO8OlYDRwTCCBA00uBHpwL2W');

$token = $_POST['stripeToken'];
$opt = $_POST['opt'];
$amount = 0;

if($opt == 1){
    $amount = 1900;
}else if($opt == 2){
    $amount = 17900;
}

try {
    //code...
    $charge = \Stripe\Charge::create(
        array(
            'amount' => $amount,
            'currency' => 'eur',
            'source' => $token
        )
    );
    echo json_encode($charge);
} catch (\Throwable $th) {
    //throw $th;
    echo json_encode($th);
}