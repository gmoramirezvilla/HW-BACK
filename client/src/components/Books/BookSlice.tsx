import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialState, Books } from './BookTypes';

const initialState: InitialState = {
  loading: false,
  books: {
    totalItems: 0,
    items: []
  },
  error: ''
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', () => {
  return axios.get('http://localhost:3000/books')
    .then(response => {
      return response.data;
    })
})

export const searchBooks = createAsyncThunk('books/fetchBooks', (title: string) => {
  return axios.get('http://localhost:3000/books/search', {
    params: {
      q: title
    }
  })
    .then(response => {
      return response.data;
    })
})

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Books>) => {
      state.loading = false
      state.books = action.payload
      state.error = ''
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false
      state.books = {
        totalItems: 0,
        items: []
      }
      state.error = action.error.message || 'Error has occurred'
    })
  }
})

export default bookSlice.reducer
