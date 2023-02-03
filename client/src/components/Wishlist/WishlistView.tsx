import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getWishlist } from './WishlistSlice';
import { WishlistContainer, WishlistElementContainer } from '../../StyledComponents';

const Wishlist = (props: any) => {
  const wishlist = useAppSelector((state) => state.wishlist.wishlist)

  return (
    <WishlistContainer>
      <h1>Wishlist</h1>
      {wishlist.map(item => {
        let { id, title } = item;
        return (
          <WishlistElementContainer id={id} key={id}>
          <div>{title}</div>
          <button id={id} title={title} onClick={props.handleRemoveWishlist}>Delete</button>
        </WishlistElementContainer>
        )
      })}
    </WishlistContainer>
  )
}

export default Wishlist;

