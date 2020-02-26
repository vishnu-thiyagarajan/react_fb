import React, { useState } from 'react'
import { Container, Message } from '../components/loginStyle'
import { Button } from '../components/homeStyle'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [pswd, setPswd] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const [message, setMessage] = useState({ color: 'DodgerBlue' })
  const emailHandler = event => {
    setEmail(event.target.value)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) return setValidEmail(true)
    setValidEmail(false)
  }
  const signUp = async (event) => {
    if (!email || !userName || !pswd) return
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailid: email, userName: userName, password: pswd })
      })
      if (res.status === 403) setMessage({ color: 'Red', body: 'User already exists' })
      if (res.status === 201) {
        setMessage({ color: 'DodgerBlue', body: 'Signup success - Redirecting to login in 5sec' })
        setTimeout(() => history.push('/login'), 5000)
      }
    } catch (err) {
      setMessage({ color: 'Red', body: 'Check Internet Connection' })
      console.log('Fetch Error :', err)
      return
    }
    setEmail('')
    setUserName('')
    setPswd('')
  }
  return (
    <div>
      <Container>
        <h1>Sign up</h1>
        <Message color={message.color}>{message.body}</Message>
        <div className='item'>Emailid :
          <input className='inpt' onChange={emailHandler} value={email} type='email' />
        </div>
        {!validEmail && <div>*** Invalid Email ***</div>}
        <div className='item'>Username :
          <input
            className='inpt' type='text' value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
          />
        </div>
        <div className='item'>Password :
          <input
            className='inpt' type='password' value={pswd}
            onChange={(e) => { setPswd(e.target.value) }}
          />
        </div>
        <Button onClick={signUp} className='inpt'>Sign up</Button>
      </Container>
    </div>
  )
}

export default Signup
