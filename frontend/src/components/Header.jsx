import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Header = ({createPo,setCreatePo}) => {

  const navigate = useNavigate();

  const onMove = () =>{
    localStorage.clear();
    navigate('/login')
  }

  const createPost = () =>{
    // navigate('/createpost')
    setCreatePo(true)
  }

  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <div className='header'>
        <div className='logo'>
           <span>A2M</span>BROTHERS
        </div>
        <div className='actions'>
          {
            user 
            ? 
            <>
        <Dropdown>
        <Dropdown.Toggle variant='red' id='dropdown-basic'> {user.name} </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={createPost}>
            Create Post
          </Dropdown.Item>
          <Dropdown.Item onClick={onMove}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        {/* </div> */}
            
            </>
            :
            <Button onClick={onMove} variant="red">Login</Button>
          }
        </div>
    </div>
  )
}

export default Header