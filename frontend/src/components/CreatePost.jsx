import React from 'react'
import {Button, Container, Form } from 'react-bootstrap'
import { Card } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import Points from '../connection/Points'
import { useState } from 'react'
import {v4 as uuidv4 } from 'uuid'

const CreatePost = ({setCreatePo,postUserEditId,edit}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [postUser, setPostUser] = useState({id:uuidv4(),arias:user.name,post:''})
    const navigate = useNavigate()

    const cancel = () =>{
        setCreatePo(false)
    }
    const rejectMessage = {'status':404,'message':'Please login first!'}

    const confirmPost = async(e) =>{
        e.preventDefault()
        if(edit) {
            await Points.editPost(postUserEditId,postUser.post).then(res=>{
                window.location.reload()
                setCreatePo(false)
                console.log(res.data)
            }).catch(e=>{
                console.log(e.message)
            })    
        } else {
            await Points.createPost(postUser).then(res=>{
                window.location.reload()
                setCreatePo(false)
                console.log(res.data)
            }).catch(e=>{
                console.log(e.message)
            })
        }
    }
    console.log(postUserEditId)

  return (
    <div style={{backgroundColor:'transparent'}}>
        {

            user ? (
                
                <div className='cardContainer'>
            <div className='registerHeader'>
                <p>Point you're thoughts out</p>
            </div>

    <div className='outCard'>
        <Form className='thoughtsForm' onSubmit={confirmPost}>
            <div>
            <h1>
                {user.name}
            </h1>
            </div>
            <div className='textarea'>
                <textarea 
                autoFocus
                onChange={e=>setPostUser({...postUser,post : e.target.value})}
                placeholder='Your Thoughts'
                class="form-control"
                id="exampleFormControlTextarea1"
                name='arias'
                rows="10"
                >{postUser.post}</textarea>
            </div>
            <Button type='submit' className='m-3' variant='secondary'>Submit</Button>
            <Button type='button' className='m-3' variant='red' onClick={cancel}>Cancel</Button>
        </Form>
    </div>
    </div>
    ) : (
        JSON.stringify(rejectMessage)
    )
    }
    </div>
  )
}

export default CreatePost
