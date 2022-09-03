<?php

class RegisterCtl extends RegisterSys
{
    public function processRegisterReqquest($method)
    {
        switch ($method) {
            case "POST" :
                $this->register();
                break;
            default :
            http_response_code(405);
            header("Allow: POST"); 
        }
    }
}