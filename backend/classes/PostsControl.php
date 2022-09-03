<?php

class PostsControl extends Posts
{
    public function processRequest($method, $id)
    {
        if( $id ) {
            $this->handleIndividuals($method,$id);
        } else {
            $this->handleCollections($method);
        }   
    }

    private function handleIndividuals($method,$id)
    {
        switch ($method) {
            case "GET" : 
                $this->getIndividual($id);
                break;
                case "DELETE" : 
                    $this->deletePost($id);
                    break;
                case "PATCH" : 
                    $this->updatePost($id);
                    break;
            default :
                http_response_code(405);
                header("Allow: GET, DELETE, PATCH"); 
        }
    }

    private function handleCollections($method)
    {
        switch ($method) {
            case "GET" : 
                $this->getAllPosts();
                break;
            case "POST" : 
                $this->postPost();
                break;
            default :
            http_response_code(405);
            header("Allow: GET, POST"); 
        }
    }
}