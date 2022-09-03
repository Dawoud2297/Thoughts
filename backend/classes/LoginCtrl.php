<?php

class LoginCtrl extends Login
{
    public function processLoginRequest($method)
    {
        switch ($method){
            case "POST" :
                $this->login();
                break;
            default :
                http_response_code(405);
                header("Allow: POST"); 
        }
    }
}