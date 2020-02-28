import React from 'react'
import { Container } from '../components/loginStyle'
import { useHistory } from 'react-router-dom'

const Logout = (props) => {
  const history = useHistory()
  localStorage.clear()
  setTimeout(() => history.push('/login'), 1000)
  props.loginHandler(null)
  return (
    <div>
      <Container>
        <h1>Logged out Successfully</h1>
      </Container>
    </div>
  )
}

export default Logout
