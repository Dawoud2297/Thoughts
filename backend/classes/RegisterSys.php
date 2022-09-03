<?php

class RegisterSys extends Dbh
{
    private $content;
    private $id;
    private $name;
    private $email;
    private $password;

    public function __construct()
    {
        $this->content = json_decode(file_get_contents('php://input',true),true);
    }
    protected function register()
    {
        $this->id = $this->content['id'];
        $this->name = $this->content['name'];
        $this->email = $this->content['email'];
        $this->password = $this->content['password'];
        $hashedPass = password_hash($this->password,PASSWORD_DEFAULT);

        $insert = "INSERT INTO users(id,name,email,password) VALUES(
            '$this->id','$this->name','$this->email','$hashedPass'
            )";
        $onlyUser = "SELECT * FROM users WHERE name='$this->name' OR email='$this->email'";
        $queryUser = $this->connection()->query($onlyUser);

        if ($queryUser->num_rows > 0) {
            $res = ["status"=>http_response_code(409),'message'=>'User already exists!'];
        } elseif ( $this->connection()->query($insert)) {
            $res = ['status'=>1, 'message'=>'Registered Successfully'];
        } else {
            $res = ['status'=>0, 'message'=>'Something went wrong!'];
        }
        echo json_encode($res);
    }
}

