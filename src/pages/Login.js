import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Message } from '../components/loginStyle'
import { Button } from '../components/homeStyle'

const Login = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const [pswd, setPswd] = useState('')
  const [message, setMessage] = useState({ color: 'DodgerBlue' })
  const emailHandler = event => {
    setEmail(event.target.value)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) return setValidEmail(true)
    setValidEmail(false)
  }

  const login = async (event) => {
    if (!email || !pswd) return
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ emailid: email, password: pswd })
      })
      const response = await res.json()
      if (res.status === 403 || res.status === 404) return setMessage({ color: 'Red', body: response.message })
      if (res.status === 200) {
        console.log(response)
        sessionStorage.setItem('SocializeJWT', response.accessToken)
        sessionStorage.setItem('loggedUser', response.loggedUser)
        sessionStorage.setItem('loggedEmail', response.loggedEmail)
        props.loginHandler({ name: response.loggedUser, email: response.loggedEmail })
        history.push('/')
      }
    } catch (err) {
      setMessage({ color: 'Red', body: 'Check Internet Connection' })
      console.log('Fetch Error :', err)
    }
  }

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <Message color={message.color}>{message.body}</Message>
        <div className='item'>Emailid : <input className='inpt' onChange={emailHandler} value={email} type='email' /> </div>
        {!validEmail && <div>*** Invalid Email ***</div>}
        <div className='item'>Password : <input value={pswd} onChange={(e) => { setPswd(e.target.value) }} className='inpt' type='password' /> </div>
        <Button onClick={login} className='inpt'>Login</Button>
      </Container>
    </div>
  )
}

export default Login
