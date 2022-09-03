<?php

spl_autoload_register(function ($class){
    $path = "classes/".$class.".php";
    include $path;
});

// // Cors
$cors = new Cors();
$cors->cors();

$postsCtl = new PostsControl();

// REGISTER
$register = new RegisterCtl();

// LOGIN
$login = new LoginCtrl();

// path
$parts = explode("/", $_SERVER["REQUEST_URI"]);

// echo $parts[2];

if($parts[2] !== 'CRUD') {
    http_response_code(404);
    exit;
}
    // $posts->getAllPosts();
    if( $parts[3] === 'register') {
        // echo "HELLO registerer!";
        $register->processRegisterReqquest($_SERVER['REQUEST_METHOD']);
    } elseif ( $parts[3] === 'login') {
        $login->processLoginRequest($_SERVER['REQUEST_METHOD']);
        // echo "Login";
    }else {
        $postsCtl->processRequest($_SERVER["REQUEST_METHOD"],$parts[3]);
    }