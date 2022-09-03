import React from 'react'

const Header = ({user}) => {
  return (
    <div className='header'>
      <div className='title'>
        <p>
        {
          user?.name
        }
        </p>
      </div>
    </div>
  )
}

export default Header