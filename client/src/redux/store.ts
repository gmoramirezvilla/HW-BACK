import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../components/Books/BookSlice';
import wishlistReducer from '../components/Wishlist/WishlistSlice'

const store = configureStore({
  reducer: {
    books: bookReducer,
    wishlist: wishlistReducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch