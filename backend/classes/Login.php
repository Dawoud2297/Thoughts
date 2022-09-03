<?php

class Login extends Dbh
{
    private $content;
    private $username;
    private $password;

    public function __construct()
    {
        $this->content = json_decode(file_get_contents('php://input',true),true);
      
    }

    protected function login()
    {
        $this->username = $this->content['username'];
        $this->password = $this->content['password'];
        
        $log = "SELECT * FROM users WHERE name='$this->username' OR email='$this->username'";
        $query = $this->connection()->query($log);

        if ($query->num_rows == 0) {
            $res = ["status"=>http_response_code(404),'message'=>'No such user!'];
        } elseif ($query) {
            $hashed = $query->fetch_all(MYSQLI_ASSOC);
            $verifying = password_verify($this->password,$hashed[0]['password']);
            if( $verifying == false ) {
                $res = ['status'=>http_response_code(401),'message'=>'Wrong password!'];
            } else {
                $res = $hashed;
            }
        } else {
            $res = ['status'=>0,'message'=>'Something Went Wrong!'];
        }
        echo json_encode($res);
    }
}