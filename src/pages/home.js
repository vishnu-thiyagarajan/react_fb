import React, { useState, useRef, useCallback } from 'react'
import { Container, PostContainer, TextArea, Button } from '../components/homeStyle'

const delImg = require('../images/delete.png')
const likeImg = require('../images/like.jpg')
const CommentImg = require('../images/comment.png')
const dfuser = 'default user'
const Home = () => {
  const limit = 5
  const [page, setPage] = useState(0)
  const [value, setValue] = useState('')
  const [obj, setObj] = useState([])
  const observer = useRef()
  let hasMore = true
  const fetchData = async () => {
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts/' + page + '/' + limit)
      const data = await res.json()
      if (!data.length) {
        hasMore = false
        return
      }
      setObj([...obj, ...data])
      setPage(page + limit)
    } catch (err) {
      console.log('Fetch Error :', err)
    }
  }
  const lastPostElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchData()
      }
    })
    if (node) observer.current.observe(node)
  }, [fetchData, hasMore])
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
                <div>
                  <img
                    onClick={(e) => { delStatus(_item._id) }}
                    src={delImg} height='20px' width='20px' alt='X'
                  />
                  <img
                    onClick={(e) => { console.log('liked') }}
                    src={likeImg} height='20px' width='20px' alt='L'
                  />
                  <img
                    onClick={(e) => { console.log('comment') }}
                    src={CommentImg} height='20px' width='20px' alt='C'
                  />
                </div>
                <div>{_item.userHandle}</div>
              </div>
            </PostContainer>
          )
        })}
        <hr ref={lastPostElementRef} />
      </Container>
    </div>
  )
}

export default Home
