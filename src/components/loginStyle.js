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
const Message = styled.section`
  color: ${props => props.color};
`
export {
  Container,
  Message
}
