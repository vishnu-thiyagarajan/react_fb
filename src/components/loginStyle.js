import styled from 'styled-components'
const Container = styled.section`
  margin: auto;
  margin-top: 10px;
  display: grid;
  justify-items: center;
  grid-template-rows: auto auto auto;
  font-size: 25px;
  max-width: 500px;

  .item {
    margin: 10px;
    font-size: 25px;
    width: 100%;

  }
  .inpt {
    border-radius: 5px;
    padding: 12px 20px;
    font-size: 25px;
    margin: 8px 0;
    box-sizing: border-box;
    width: 100%;
  }
`
// const PostContainer = styled.section`
//   margin-top: 10px;
//   border-radius: 10px;
//   border: 2px solid lightgrey;
//   padding: 20px;
//   display: flex;
//   flex-flow: column;
//   word-wrap: break-word;

//   .controls {
//     margin: 0;
//     margin-top: 10px;
//     display: flex;
//     justify-content: space-between;
//     flex-flow: row;
//     flex-direction: row;
//   }
// `
// const TextArea = styled.textarea`
//   height: ${props => props.height};
//   border-radius: 15px;
//   resize: none;
//   outline: none;
//   padding: 7px;
// `
// const Button = styled.button`
//   background-color: DodgerBlue;
//   outline: none;
//   border-radius: 5px;
//   color: white;
//   font-size: 15px;
//   font-weight: bold;
//   text-shadow: 1px 1px 1px black;
// `

// const Comment = styled.div`
//   display: grid;
//   grid-template-columns: 100px auto auto;
//   word-wrap: break-word;
//   word-break: break-all;
// `
export {
  Container,
//   PostContainer,
//   TextArea,
//   Button,
//   Comment
}
