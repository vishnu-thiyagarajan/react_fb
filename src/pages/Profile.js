import React, { useRef, useState, useEffect } from 'react'
import { DpContainer } from '../components/profileStyle'

const Profile = (props) => {
  const loggedEmail = props.loggedInUser ? props.loggedInUser.email : null
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
          Authorization: 'Bearer ' + localStorage.getItem('SocializeJWT')
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
  useEffect(() => {
    const displayDp = async () => {
      try {
        const response = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'users/' + props.selectedProfile, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('SocializeJWT')
          }
        })
        const res = await response.json()
        setDp(res.dp)
        setUser(res.userName)
      } catch (err) {
        console.log('Fetch Error :', err)
      }
    }
    displayDp()
  }, [props])
  const onDivClick = () => inputFile.current.click()
  return (
    <div>
      <DpContainer>
        {props.selectedProfile === loggedEmail &&
          <div onClick={onDivClick}>
            {!dp && <h1>To upload image click me</h1>}
            {dp && <img src={process.env.REACT_APP_BACKEND_URL + 'dp/' + dp} alt={dp} />}
          </div>}
        {props.selectedProfile !== loggedEmail &&
          <img src={process.env.REACT_APP_BACKEND_URL + 'dp/' + dp} alt={dp} />}
        <input type='file' id='file' onChange={fileSelectedHandler} ref={inputFile} style={{ display: 'none' }} />
        <h1>{user}</h1>
      </DpContainer>
    </div>
  )
}

export default Profile
