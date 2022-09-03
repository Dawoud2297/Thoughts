<?php

class Posts extends Dbh
{
    private $content;
    private $id;
    private $arias;
    private $post;

    public function __construct()
    {
        $this->content = json_decode(file_get_contents('php://input',true),true);
    }
    protected function postPost()
    {
        $this->post = $this->content['post'];
        $this->id = $this->content['id'];
        $this->arias = $this->content['arias'];
        $user = "SELECT * FROM users WHERE name='$this->arias'";
        $queryUser = $this->connection()->query($user);
        
        if( $queryUser->num_rows == 0) {
            $res = ['status'=>http_response_code(404),'message'=>'Posts say no such user!'];
        } else {
            $getUserData = $queryUser->fetch_all(MYSQLI_ASSOC);
            $nameOfUser = $getUserData[0]['name'];
            // ////////////////    
            $insertion = "INSERT INTO posts(id,username,post) VALUES(
                '$this->id','$nameOfUser','$this->post')";
            
            if ( $this->connection()->query($insertion)) {
                $res = ['status'=>1,'message'=>'Post is  posted successfully!'];
            } else {
                $res = ['status'=>0,'message'=>'Something went wrong!'];
            }
        }
        echo json_encode($res);
    }
    protected function getAllPosts()
    {
        $posts = "SELECT * FROM posts";
        $query = $this->connection()->query($posts);

        echo json_encode(mysqli_fetch_all($query,MYSQLI_ASSOC));
    }
    protected function deletePost($id)
    {
            $sql = "DELETE FROM posts WHERE id='$id'";

            $searchId = "SELECT * FROM posts WHERE id='$id'";

            if ($this->connection()->query($searchId)->num_rows == 0) {
                $res = ['status'=>http_response_code(404), 'message'=>"No post with this id to delete!"];
            } elseif ($this->connection()->query($sql)) {
                $res = ['status'=>http_response_code(200),'message'=>'Post is Deleted successfully'];
            } else {
                $res = ['status'=>0,'message'=>'Something went wrong with delete!'];
            }
        echo json_encode($res);
    }
    

    protected function updatePost($id)
    {
        $this->post = $this->content['post'];
        $sql = "UPDATE posts SET post='$this->post' WHERE id='$id'";

        $searchId = "SELECT * FROM posts WHERE id='$id'";

        if ($this->connection()->query($searchId)->num_rows == 0) {
            $res = ['status'=>http_response_code(404), 'message'=>"No post with this id to update!"];
        } elseif ($this->connection()->query($sql)) {
            $res = ['status'=>http_response_code(200),'message'=>"Post is updated successfully!"];
        } else {
            $res = ['status'=>0,'message'=>'Something went wrong with update!'];
        }
        echo json_encode($res);
    }
    protected function getIndividual($id)
    {
        $sql = "SELECT * FROM posts WHERE id='$id'";
        $query = $this->connection()->query($sql);

            if($query->num_rows == 0) {
                $res = ['status'=>http_response_code(404),'message'=>"No post with this id!"];
            } elseif ($query) {
                $res = mysqli_fetch_assoc($query);
            } else {
                $res = ['status'=>0,'message'=>'Can not get the POST'];
            }
            echo json_encode($res);
    }
}