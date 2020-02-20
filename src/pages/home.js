import React, { useState } from 'react'
import styled from 'styled-components'
const obj = []
const Container = styled.section`
  margin: auto;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  max-width: 500px;

  .controls {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    flex-direction: row;
  }
`
const PostContainer = styled.section`
  margin: 10px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  padding: 20px;
  display: flex;
  flex-flow: column;
  word-wrap: break-word;
  .user {
    display: block;
    max-width: 250px;
    align-self: flex-end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const TextArea = styled.textarea`
  height: 200px;
  border-radius: 15px;
  resize: none;
  outline: none;
  padding: 7px;
`
const Button = styled.button`
  background-color: DodgerBlue;
  outline: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-shadow: 1px 1px 1px black;
`
const Home = () => {
  const [value, setValue] = useState('')
  const postData = () => {
    obj.push(value)
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
        {obj.map((_item, _id) => {
          return (
            <PostContainer key={_id}>{_item}
              <div className='user'>default user</div>
            </PostContainer>
          )
        })}
      </Container>
    </div>
  )
}

export default Home
