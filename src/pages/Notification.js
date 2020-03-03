import React from 'react'
import { Container } from '../components/loginStyle'
import { PostContainer } from '../components/homeStyle'

const Notification = (props) => {
  console.table(props.notify)
  return (
    <div>
      <Container>
        {props.notify.map((item, id) => {
          return (
            <PostContainer key={id}>
              <div>
                {item.userName} has posted {item.body ? item.body.slice(0, 15) + '...' : 'an image'}
              </div>
            </PostContainer>
          )
        }
        )}
      </Container>
    </div>
  )
}

export default Notification
