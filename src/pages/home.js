import React, { useState, useEffect } from 'react'
import { Container, PostContainer, TextArea, Button } from '../components/homeStyle'

const delImg = require('../images/delete.png')
const dfuser = 'default user'

const Home = () => {
  const [value, setValue] = useState('')
  const [obj, setObj] = useState([])
  const delStatus = async (id) => {
    try {
      await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id })
      })
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    }
    setObj(obj.filter((item) => item._id !== id))
  }
  const fetchData = async () => {
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts')
      setObj(await res.json())
    } catch (err) {
      console.log('Fetch Error :', err)
    }
  }
  const postData = async () => {
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userHandle: dfuser, body: value })
      })
      var insertedObj = await res.json()
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    }
    setObj([insertedObj, ...obj])
    setValue('')
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Container>
        <TextArea
          placeholder="what's in your mind?" rows='10' cols='60' value={value}
          onChange={(e) => { setValue(e.target.value) }}
        />
        <div className='controls'>
          <div><Button>Image</Button></div>
          <div><Button onClick={postData}>Post</Button></div>
        </div>
        {obj.map((_item, id) => {
          return (
            <PostContainer key={id}>{_item.body}
              <div className='controls'>
                <img
                  onClick={(e) => { delStatus(_item._id) }}
                  src={delImg} height='20px' width='20px' alt='X'
                />
                <div>{_item.userHandle}</div>
              </div>
            </PostContainer>
          )
        })}
      </Container>
    </div>
  )
}

export default Home
