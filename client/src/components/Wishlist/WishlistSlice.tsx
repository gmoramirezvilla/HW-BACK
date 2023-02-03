import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isHtmlElement } from 'react-router-dom/dist/dom';

type WishlistItem = {
  id: string,
  title: string,
  email: string
}

type Wishlist = {
  loading: boolean,
  wishlist: WishlistItem[],
  error: string
}

type DeleteData = {
  email: string,
  id: string
}

const initialState: Wishlist = {
  loading: false,
  wishlist: [],
  error: ''
}

export const getWishlist = createAsyncThunk('wishlist/getWishlist', (email: string) => {
  return axios.post('http://localhost:3000/books/wishlist/items', {
    data: { email }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
})

export const addWishlist = createAsyncThunk('wishlist/addWishlist', (data : WishlistItem) => {
  return axios.post('http://localhost:3000/books/wishlist', {
    data
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
})

export const deleteWishlist = createAsyncThunk('wishlist/deleteWishlist', (data : DeleteData) => {
  return axios.delete('http://localhost:3000/books/wishlist', {
    data
  })
    .then(response => {
      return response.data;
    })
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<WishlistItem>) => {
      let { email, id, title } = action.payload;
      state.wishlist = [...state.wishlist, {email, id, title}]
    },
    remove: (state, action: PayloadAction<WishlistItem>) => {
      let { email, id, title } = action.payload;
      state.wishlist = state.wishlist.filter(item => item.id !== id)
    }
  },
  extraReducers: builder => {
    builder.addCase(getWishlist.pending, state => {
      state.loading = true
    })
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.loading = false
      state.wishlist = action.payload
      state.error = ''
    })
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.loading = false
      state.wishlist = []
      state.error = action.error.message || 'Error has occurred'
    })
  }
})

export default wishlistSlice.reducer;
export const { add, remove } = wishlistSlice.actions