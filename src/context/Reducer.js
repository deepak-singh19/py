export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, buy_qty: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id), // Corrected line
      };
      case "CHANGE_QTY":
        return{
          ...state,
          cart: state.cart.filter((c)=>c.id===action.payload.id?(c.buy_qty=action.payload.buy_qty): c.buy_qty)
        }
      
    default:
      return state;
  }
};

export const whishlistReducer=(state, action)=>{
  switch(action.type){
    case "ADD_TO_WISHLIST":
      return{
        ...state,
        wishlist:[...state.wishlist,{...action.payload}],
      };
      case"REMOVE_FROM_WISHLIST":
        return{
          ...state,
          wishlist: state.wishlist.filter((c)=>c.id!==action.payload.id),
        }
      default:
        return state;
  }
}

// Context API
