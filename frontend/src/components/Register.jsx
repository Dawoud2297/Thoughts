import { useState } from 'react'
import {Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4 } from 'uuid'
import Points from '../connection/Points'

const Register = () => {
    const [user, setUser] = useState({id: uuidv4(),username:'',email:'',password:''})
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(user.password !== confirmPassword){
            alert(`Password doesn't match`)
        } else {
            Points.register(user).then(res=>{
                console.log('DoNE!')
                console.log(res.data)
                navigate('/')
            }).catch(e=>{
                alert('user already exists check username or email')
            })
        }
    }

    const alreadyHave = () =>{
        navigate('/login')
    }

    return (
        <div className='register'>
            <div className='registerHeader'>
                {/* <p>Build You're Own Business</p> */}
                <p>Point you're thoughts out</p>
            </div>

    <Container>
        <Form className='align-items-center registerForm' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor='name'>
                    Name : 
                </Form.Label>
                <Form.Control
                type='text'
                value={user.name}
                onChange={e=>setUser({...user,name : e.target.value})}
                name='name'
                id ='name'
                required/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor='email'>
                    Email : 
                </Form.Label>
                <Form.Control 
                type='email' 
                value={user.email}
                onChange={e=>setUser({...user,email : e.target.value})}
                name='email' 
                id='email' 
                required/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor='password'>
                    Password : 
                </Form.Label>
                <Form.Control 
                type='password' 
                value={user.password}
                onChange={e=>setUser({...user,password : e.target.value})}
                name='password' 
                id='password' 
                required/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor='confirmPassword'>
                    Confirm Password: 
                </Form.Label>
                <Form.Control 
                type='password' 
                name='confirmPassword' 
                id='confirmPassword' 
                required
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            <Button type='submit' className='m-3' variant='secondary'>Submit</Button>
            <Button type='button' className='m-3' variant='red' onClick={alreadyHave}>Already have a username!</Button>
        </Form>
    </Container>
    </div>
  )
}

export default Register