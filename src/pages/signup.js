import React, { useState } from 'react'
import { Container } from '../components/loginStyle'
import { Button } from '../components/homeStyle'

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [pswd, setPswd] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const emailHandler = event => {
    setEmail(event.target.value)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) return setValidEmail(true)
    setValidEmail(false)
  }
  const signUp = async (event) => {
    if (email && userName && pswd) {
      try {
        await window.fetch(process.env.REACT_APP_BACKEND_URL + 'users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailid: email, userName: userName, password: pswd })
        })
        props.history.push('/')
      } catch (err) {
        console.log('Fetch Error :', err)
        return
      }
    }
    setEmail('')
    setUserName('')
    setPswd('')
  }
  return (
    <div>
      <Container>
        <h1>Sign up</h1>
        <div className='item'>Emailid :
          <input className='inpt' onChange={emailHandler} value={email} type='email' required />
        </div>
        {!validEmail && <div>*** Invalid Email ***</div>}
        <div className='item'>Username :
          <input
            className='inpt' type='text' value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
            required
          />
        </div>
        <div className='item'>Password :
          <input
            className='inpt' type='password' value={pswd}
            onChange={(e) => { setPswd(e.target.value) }}
            required
          />
        </div>
        <Button onClick={signUp} className='inpt'>Sign up</Button>
      </Container>
    </div>
  )
}

export default Signup
