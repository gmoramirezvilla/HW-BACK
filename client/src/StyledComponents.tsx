import styled from 'styled-components';

const AllBooksContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px;
  border: none;
  margin: 5px;
  background-color: #f6f6f2;
  color: #565656;
  width: 1000px;
  h3 {
    color: #388087;
  }
  img {
    width: 150px;
    height: 200px;
    cursor: pointer;
  }
`
const BooksContainer = styled.div`
  display: block;
  position: relative;
  width: 800px;
  align-items: center;
  padding: 15px;
`
const WishlistContainer = styled(BooksContainer)`
  align-items: center;
  text-align: center;
  min-Width: 400px;
  width: 500px;
  border: none;
  margin-top: 5px;
  background-color: #c2edce;
  color: #565656;
  /* margin-top: 127px; */
`

const MainContainer = styled.div`
  display: flex;
  position: relative;
  width: 1470px;
  font-family: 'Roboto', sans-serif;
`

const WishlistElementContainer = styled.div`
  display: flex;
  width: 400px;
  padding: 5px;
  margin-bottom: 8px;
  justify-content: center;
  border: 1px grey;
  border-style: none none solid none;
  div {
    width: 300px;
    align-items: left;
    text-align: left;
    padding: 5px;
  }
  button {
    align-items: right;
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: #ee6b6e;
    color: white;
    width: 75px;
    height: 33px;
    cursor: pointer;
    &:hover {
      background-color: #ff8a8a;
    }
  }
`

const SearchContainer = styled.div`
  display: block;
  position: relative;
  width: 1435px;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 1px;
  background-color: #e3f6ff;
  padding: 15px;
  left: 0.3%;
  input {
    width: 400px;
    height: 28px;
    font-size: 15px;
    padding: 2px;
    margin: 2px;
  }
  button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 2px;
    background-color: #8dcbe6;
    color: white;
    width: 75px;
    height: 37px;
    cursor: pointer;
    &:hover {
      background-color: #9df1df;
      color: grey;
    }
  }
  h1 {
    color: #555555;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 25px;
`

const HomeContainer = styled.div`
  display: flex;
  position: relative;
  text-align: center;
  form {
    display: block;
    padding: 5px;
    margin: 5px;
    height: 100vh;
    width: 500px;
    align-items: center;
    justify-content: space-evenly;
    h1 {
      margin-top: 25vh;
    }
    label {
      display: block;
      padding: 10px;
    }
    input {
      padding: 5px;
      width: 200px;
      position: relative;
    }
    button {
      border: none;
      border-radius: 5px;
      padding: 5px;
      margin: 25px;
      background-color: #8dcbe6;
      color: white;
      width: 75px;
      height: 37px;
      cursor: pointer;
      &:hover {
        background-color: #9df1df;
        color: grey;
      }
  }
  }
`

export {
  BooksContainer,
  WishlistContainer,
  AllBooksContainer,
  MainContainer,
  WishlistElementContainer,
  SearchContainer,
  Container,
  HomeContainer
}