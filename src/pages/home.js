import React, { useState, useRef, useCallback } from 'react'
import Post from '../components/Post'
import { Container, TextArea, Button } from '../components/homeStyle'

const dfuser = 'default user'
const Home = () => {
  const limit = 5
  const [page, setPage] = useState(0)
  const [value, setValue] = useState('')
  const [file, setFile] = useState(null)
  const [obj, setObj] = useState([])
  let data = new FormData()
  const handler = (update) => setObj(update)
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
  const postData = async () => {
    data.append('userHandle', dfuser)
    data.append('body', value)
    data.append('likedUsers', [])
    data.append('comments', [])
    data.append('file', file)
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'POST',
        body: data
      })
      var insertedObj = await res.json()
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    } finally {
      data = new FormData()
    }
    setObj([insertedObj, ...obj])
    setValue('')
    setFile(null)
    document.getElementById('file-upload').value = null
  }
  const fileSelectedHandler = event => {
    const files = event.target.files
    setFile(files[0])
  }
  return (
    <div>
      <Container>
        <TextArea
          height='200px'
          placeholder="what's in your mind?" rows='10' cols='60' value={value}
          onChange={(e) => { setValue(e.target.value) }}
        />
        <div className='controls'>
          <div>
            <input
              type='file' accept='image/x-png,image/gif,image/jpeg,image/jpg'
              onChange={fileSelectedHandler} id='file-upload'
            />
          </div>
          <div><Button onClick={postData}>Post</Button></div>
        </div>
        {obj.map((_item, id) => {
          return (
            <Post key={id} handler={handler} _item={_item} loggedUser={dfuser} obj={obj} />
          )
        })}
        <hr ref={lastPostElementRef} />
      </Container>
    </div>
  )
}

export default Home
