import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const DesknavBar = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: DodgerBlue;
  color: white;
  height: 10vh;

  .logo{
    font-size: 7vh;
    font-weight: bold;
    text-shadow: 3px 3px 3px black;
  }

  .nav-links{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 50vh;
    list-style: none;
  }

  .link{
    color: white;
    font-size: 2.5vh;
    text-decoration: none;
  }
`
const NavBar = (props) => {
  return (
    <div>
      <DesknavBar>
        <div className='logo'>Socialize</div>
        {!props.loggedIn &&
          <ul className='nav-links'>
            <li><Link to='/' className='link'>Home</Link></li>
            <li><Link to='/login' className='link'>Login</Link></li>
            <li><Link to='/signup' className='link'>SignUp</Link></li>
          </ul>}
        {props.loggedIn &&
          <ul className='nav-links'>
            <li><Link to='/profile' className='link'>Profile</Link></li>
            <li><Link to='/notification' className='link'>Notification</Link></li>
            <li><Link to='/logout' className='link'>Logout</Link></li>
          </ul>}
      </DesknavBar>
    </div>
  )
}

export default NavBar
