import React, { useState } from 'react'
import { Container } from '../components/loginStyle'
import { Button } from '../components/homeStyle'

const Login = () => {
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const emailHandler = event => {
    setEmail(event.target.value)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) return setValidEmail(true)
    setValidEmail(false)
  }
  return (
    <div>
      <Container>
        <h1>Login</h1>
        <div className='item'>Emailid : <input className='inpt' onChange={emailHandler} value={email} type='email' /> </div>
        {!validEmail && <div>*** Invalid Email ***</div>}
        <div className='item'>Password : <input className='inpt' type='password' /> </div>
        <Button className='inpt'>Login</Button>
      </Container>
    </div>
  )
}

export default Login
