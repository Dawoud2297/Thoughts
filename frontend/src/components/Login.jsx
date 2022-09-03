import { useState } from 'react'
import {Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Points from '../connection/Points'

const Login = () => {
  const [user, setuser] = useState({username : '' ,password : ''})

    const navigate = useNavigate()

    const handleSubmit = e =>{
        e.preventDefault()
        Points.login(user).then( res => {
            if(res.data.message === 'Wrong password!'){
                alert('Wrong password!')
            }else if (res.data.message === 'No such user!'){
                alert('No such user!')
            }else{
                localStorage.setItem('user',JSON.stringify(res.data[0]))
                console.log(res.data)
                navigate(`/home-thoughts`)
            }
        }).catch( e=>{
            alert('Wrong username or password!') &&
            setuser({username : '',password : ''})
        })
    }
    const dontHave = () =>{
        navigate('/register')
    }

  return (
    <div className='register'>
    <div className='registerHeader'>
        <p>Point you're thoughts out</p>
    </div>

<Container>
<Form className='align-items-center registerForm' onSubmit={handleSubmit}>
    <Form.Group>
        <Form.Label htmlFor='username'>
            UserName : 
        </Form.Label>
        <Form.Control 
        type='text'
        onChange={e=>setuser({...user,username : e.target.value})}
        name='username' 
        id='username' 
        placeholder='Enter username or email'
        required/>
    </Form.Group>
    <Form.Group>
        <Form.Label htmlFor='password'>
            Password : 
        </Form.Label>
        <Form.Control 
        type='password'
        onChange={e=>setuser({...user,password : e.target.value})}
        name='password' 
        id='password' 
        required/>
    </Form.Group>
    <Button type='submit' className='m-3' variant='secondary'>Submit</Button>
    <Button type='button' className='m-3' variant='red' onClick={dontHave}>Don't have username yet!</Button>
</Form>
</Container>
</div>
  )
}

export default Login