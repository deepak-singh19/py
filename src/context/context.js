import React,{createContext, useContext, useReducer} from 'react';
import { Items } from '../utills/data';
import { cartReducer, whishlistReducer } from './Reducer';

const Cart = createContext();

const Context = ({children}) => {

  const [state, dispatch]= useReducer(cartReducer,{
    cart:[],
  })

  const [wishliststate, wishlistDispatch]= useReducer(whishlistReducer,{
    wishlist:[],
  })
  return (
   <Cart.Provider value={{state, dispatch,wishliststate, wishlistDispatch}}>
    {children}
   </Cart.Provider>
  )
}

export const CartState =()=>{
  return useContext(Cart);
}

export default Context;

