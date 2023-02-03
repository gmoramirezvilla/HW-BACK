import { useState } from 'react'
import BookView from './components/Books/BookView';
import Home from './components/Home/Home';
import { Container } from './StyledComponents';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path="books" element={ <BookView/> } />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
