import http from './http-common'

class Points
{
    getPosts()
    {
        return http.get('/')
    }
    createPost(data)
    {
        return http.post('/',data)
    }
    editPost(id,data)
    {
        return http.patch(`/${id}`,data)
    }
    deletePost(id)
    {
        return http.delete(`/${id}`)
    }
    register(data)
    {
        return http.post('/register',data)
    }
    login(data)
    {
        return http.post('/login',data)
    }
}

export default new Points();