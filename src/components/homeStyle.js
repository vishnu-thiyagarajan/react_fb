import styled from 'styled-components'
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
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  padding: 20px;
  display: flex;
  flex-flow: column;
  word-wrap: break-word;

  .controls {
    margin: 0;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    flex-direction: row;
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
export {
  Container,
  PostContainer,
  TextArea,
  Button
}
