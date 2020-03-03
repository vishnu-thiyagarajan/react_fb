import React, { useState, useRef, useCallback } from 'react'
import Post from '../components/Post'
import { Container, TextArea, Button } from '../components/homeStyle'

const Home = (props) => {
  const loggedEmail = props.loggedInUser ? props.loggedInUser.email : null
  const loggedUser = props.loggedInUser ? props.loggedInUser.name : null
  const token = localStorage.getItem('SocializeJWT')
  const header = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
  const [page, setPage] = useState(0)
  const [value, setValue] = useState('')
  const [file, setFile] = useState(null)
  const [obj, setObj] = useState([])
  const [hasMore, setHasMore] = useState(true)
  let data = new FormData()
  const handler = (update) => setObj(update)
  const observer = useRef()
  const lastPostElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      const limit = Number(process.env.REACT_APP_POST_LIMIT)
      if (entries[0].isIntersecting && hasMore) {
        const fetchData = async () => {
          try {
            const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts/' + page + '/' + limit, {
              method: 'GET',
              headers: header
            })
            const data = await res.json()
            if (!data.length) {
              setHasMore(false)
              return
            }
            setObj([...obj, ...data])
            setPage(page + limit)
          } catch (err) {
            console.log('Fetch Error :', err)
          }
        }
        fetchData()
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore, page, obj, header])
  const postData = async () => {
    if (!value && !file) return
    data.append('userHandle', loggedEmail)
    data.append('userName', loggedUser)
    data.append('body', value)
    data.append('likedUsers', [])
    data.append('comments', [])
    data.append('file', file)
    try {
      const res = await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'POST',
        headers: header,
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
    props.handleNewMessage(insertedObj)
    document.getElementById('file-upload').value = null
  }
  const fileSelectedHandler = event => {
    const files = event.target.files
    setFile(files[0])
  }
  return (
    <div>
      {token &&
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
              <Post
                key={id} handler={handler} _item={_item} loggedUser={loggedUser}
                loggedEmail={loggedEmail} obj={obj} setSelectedProfile={props.setSelectedProfile}
              />
            )
          })}
          <hr ref={lastPostElementRef} />
        </Container>}
    </div>
  )
}

export default Home
