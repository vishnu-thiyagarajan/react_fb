import React, { useRef, useState, useEffect } from 'react'
// import { Container } from '../components/loginStyle'
import { Container } from '../components/homeStyle'

const Profile = (props) => {
  const loggedEmail = sessionStorage.getItem('loggedEmail')
  const [dp, setDp] = useState(null)
  const [user, setUser] = useState(null)
  const inputFile = useRef(null)
  const fileSelectedHandler = async (event) => {
    const files = event.target.files
    let data = new FormData()
    data.append('emailid', loggedEmail)
    data.append('file', files[0])
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'users/dp', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('SocializeJWT')
        },
        body: data
      })
      var insertedImgPath = await res.json()
      setDp(insertedImgPath.fileName)
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    } finally {
      data = new FormData()
    }
  }
  const displayDp = async () => {
    try {
      console.log(props.match.params.emailid)
      console.log(props.match.params)
      const response = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'users/' + props.match.params.emailid, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('SocializeJWT')
        }
      })
      const res = await response.json()
      setDp(res.dp)
      setUser(res.userName)
    } catch (err) {
      console.log('Fetch Error :', err)
    }
  }
  useEffect(() => {
    displayDp()
  }, [])
  const onDivClick = () => inputFile.current.click()
  return (
    <div>
      {props.match.params.emailid === loggedEmail &&
        <div onClick={onDivClick}>
          {!dp && <h1>To upload image click me</h1>}
          {dp && <img src={process.env.REACT_APP_BACKEND_URL + 'dp/' + dp} alt={dp} />}
        </div>}
      {props.match.params.emailid !== loggedEmail &&
        <img src={process.env.REACT_APP_BACKEND_URL + 'dp/' + dp} alt={dp} />}
      <input type='file' id='file' onChange={fileSelectedHandler} ref={inputFile} style={{ display: 'none' }} />
      <Container>
        <h1>{user}</h1>
      </Container>
    </div>
  )
}

export default Profile
