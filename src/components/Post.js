import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { PostContainer, TextArea, Comment } from '../components/homeStyle'
const delImg = require('../images/delete.png')
const likeImg = require('../images/like.jpg')
const disLikeImg = require('../images/dislike.jpg')

const Post = (props) => {
  const token = sessionStorage.getItem('SocializeJWT')
  const header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
  const [value, setValue] = useState('')
  const item = props._item
  const obj = props.obj
  const loggedUser = props.loggedUser
  const delStatus = async (id, fileName) => {
    try {
      await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'DELETE',
        headers: header,
        body: JSON.stringify({ _id: id, fileName: fileName })
      })
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    }
    props.handler(obj.filter((item) => item._id !== id))
  }
  const likePost = async (post) => {
    try {
      const index = post.likedUsers.indexOf(loggedUser)
      index !== -1 ? post.likedUsers.splice(index, 1) : post.likedUsers.push(loggedUser)
      await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(post)
      })
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    }
    props.handler(obj.slice())
  }
  const addComment = async (event) => {
    const cmntObj = { user: loggedUser, comment: value }
    item.comments.push(cmntObj)
    try {
      await window.fetch(process.env.REACT_APP_BACKEND_URL + 'posts', {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(item)
      })
    } catch (err) {
      console.log('Fetch Error :', err)
      return
    }
    setValue('')
    props.handler(obj.slice())
  }
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <PostContainer>{item.body}
        {item.fileName && <img src={process.env.REACT_APP_BACKEND_URL + item.fileName} alt={item.fileName} />}
        <div className='controls'>
          <div>
            {props.loggedEmail === item.userHandle &&
              <img
                onClick={(e) => { delStatus(item._id, item.fileName) }}
                src={delImg} height='20px' width='20px' alt='X'
              />}
            <ReactTooltip multiline />
            <img
              data-tip={item.likedUsers.join('<br />')}
              onClick={(e) => { likePost(item) }}
              src={item.likedUsers.includes(loggedUser) ? disLikeImg : likeImg} height='20px' width='20px' alt='L'
            />
          </div>
          <div>{item.userName}</div>
        </div>
        <PostContainer>
          <TextArea
            value={value} onChange={handleChange}
            height='50px' placeholder='comment goes here...'
            onKeyPress={(event) => event.key === 'Enter' ? addComment(event) : null}
          />
          {item.comments.map((commentObj, index) => {
            return (
              <Comment key={index}>
                <div>{commentObj.user}</div>
                <div>:</div>
                <div>{commentObj.comment}</div>
              </Comment>)
          })}
        </PostContainer>
      </PostContainer>
    </div>
  )
}

export default Post
