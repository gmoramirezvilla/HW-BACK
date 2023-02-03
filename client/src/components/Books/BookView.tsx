import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBooks, searchBooks } from "./BookSlice";
import { add, addWishlist, remove, deleteWishlist, getWishlist } from "../Wishlist/WishlistSlice";
import Wishlist from "../Wishlist/WishlistView";
import { BooksContainer, AllBooksContainer, SearchContainer, MainContainer } from '../../StyledComponents';
import { logout, getCurrentUser } from '../Home/HomeAPI';
import { useNavigate } from "react-router-dom";

const BookView = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [email, setEmail] = useState('');
  const books = useAppSelector((state) => state.books);
  const wishlist = useAppSelector((state => state.wishlist));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddWishlist = (e: any) => {
    if (!wishlist.wishlist.some(item => item.title === e.target.title)) {
      dispatch(add({email, id: e.target.id, title: e.target.title}));
      dispatch(addWishlist({email, id: e.target.id, title: e.target.title}));
    }
  }

  const handleRemoveWishlist = (e : any) => {
    dispatch(remove({email, id: e.target.id, title: e.target.title}))
    dispatch(deleteWishlist({id: e.target.id, email}))
  }

  const handleSearch = (e : any) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      dispatch(searchBooks(searchValue));
      setSearchValue('');
    }
  }

  const onSearchChange = (e : any) => {
    setSearchValue(searchValue => e.target.value);
  }

  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    dispatch(fetchBooks());
    setEmail(getCurrentUser().email)
    dispatch(getWishlist(getCurrentUser().email))
  }, [])

  return (
    <div>
      <SearchContainer>
        <h1>Book Search</h1>
        <form onSubmit={handleSearch}>
          <input onChange={onSearchChange} value={searchValue}></input>
          <button>Search</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
      </SearchContainer>
      <MainContainer>
      {books.loading &&
        <AllBooksContainer>
          <BooksContainer>
            <h1>Loading...</h1>
          </BooksContainer>
        </AllBooksContainer>}
      {!books.loading && books.error ? <div>Error: {books.error}</div> : null}
      {!books.loading && books.books?.items?.length ? (
        <div>
          {books.books.items.map(book => {
            let { description, publishedDate, publisher, authors, title, imageLinks } = book.volumeInfo;
            let { id } = book;
            return (
              <AllBooksContainer key={id} id={id}>
              <img id={id} title={title} src={imageLinks?.smallThumbnail} onClick={handleAddWishlist}/>
              <BooksContainer id={id}>
                <h3>{title}</h3>
                <div><b>Authors</b>: {authors?.join(', ')}</div>
                <div><b>Publisher</b>: {publisher}</div>
                <div><b>Publish Date</b>: {publishedDate}</div>
                <div><b>Description</b>: {description}</div>
              </BooksContainer>
            </AllBooksContainer>
            )
          })}
        </div>
      ) : null}
        <Wishlist email={email} handleRemoveWishlist={handleRemoveWishlist}/>
       </MainContainer>
    </div>
  )
}

export default BookView;