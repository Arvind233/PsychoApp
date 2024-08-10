import { ADD_TO_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from '../actions/cartActions';

const initialState = {
  cartItems: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    default:
      return state;
  }
}
