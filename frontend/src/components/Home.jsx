import React, { useEffect, useState } from 'react'
import { Typography, Box, Card, CardContent } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import Header from './Header';
import Points from '../connection/Points';
import CreatePost from './CreatePost';

const Home = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const [posts, setPosts] = useState([])
  const [idChecked, setIdChecked] = useState([])
  const [createPo, setCreatePo] = useState(false)
  const [edit, setedit] = useState(false)
  const [postUserEditId, setPostUserEditId] = useState('')


  const fetchAllPosts = () =>{
    Points.getPosts().then(res=>{
      setPosts(res.data)
      console.log(res.data)
    })
  }

  const deletePost = async() =>{
    await Points.deletePost(postUserEditId).then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e.message)
    })
  }

  const editPost = () =>{
    setedit(true)
    setCreatePo(true)
  }
  useEffect(()=>{
    fetchAllPosts()
  },[])


  return (
    // `overflow  `
    <div style={{ overflow : `${createPo ? 'hidden' : 'visible'}`}}>

      {
        createPo ? 
        (
          <div className='popupColor'>
          <div className='popup'>
          <CreatePost setCreatePo={setCreatePo} postUserEditId={postUserEditId} edit={edit}/>
          </div>
          </div>
          )
        :
        (
          <>
          <div className='home'>
            <Header createPo={createPo} setCreatePo={setCreatePo}/>
            </div>
              <Typography>
                {
                  posts?.map(post=>(
                    <Box >
                      <Card className='content'>
                        <CardContent>
                          <div>
                            <div className='checkbox'>
                              {
                                post.username === user.name ?  (
                                  <Dropdown onClick={e=>setPostUserEditId(post.id)}>
                                  <Dropdown.Toggle  variant='red' id='dropdown-basic'>
                                  <MoreHorizIcon />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item 
                                    onClick={editPost}
                                    >
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                    onClick={
                                      deletePost
                                    }
                                    >
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                ) : ( 
                                  <div></div>
                                )
                              }
                            </div>
                            <div>
                              <h1>{post.username}</h1>
                              <div className='thePost'>
                                {post.post}
                                <br/>
                                {post.id}
                              </div>
                              <div className='date'>
                                {
                                  moment(post.post_date).fromNow()
                                }
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                }
              </Typography>
          </>
        )
      }
        </div>
  )
}

export default Home;
