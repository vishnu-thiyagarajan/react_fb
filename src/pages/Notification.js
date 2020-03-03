import React, { useEffect } from 'react'
import { Container } from '../components/loginStyle'
import { PostContainer } from '../components/homeStyle'
import socketIOClient from 'socket.io-client'

const Notification = (props) => {
  const loggedEmail = props.loggedInUser ? props.loggedInUser.email : null
  const loggedUser = props.loggedInUser ? props.loggedInUser.name : null
  const token = localStorage.getItem('SocializeJWT')
  const [obj, setObj] = useState([])
  const header = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
  const socket = socketIOClient('http://127.0.0.1:8000')
  useEffect(() => {
    // try {
    //     const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts/0/10', {
    //       method: 'GET',
    //       headers: header
    //     })
    //     const data = await res.json()
    //     setObj([...obj, ...data])
    //   } catch (err) {
    //     console.log('Fetch Error :', err)
    //   }
    socket.on('receive message', payload => {
      console.log(payload)
    })
  }, [socket])

  return (
    <div>
      <Container>
        <PostContainer>
          <h1>Notification</h1>
        </PostContainer>
      </Container>
    </div>
  )
}

export default Notification
