import {
  CART_ITEM_ADD,
  CART_ITEM_INCREASE,
  CART_ITEM_DECREASE,
  CART_ITEM_REMOVE,
  CLEAR_CART,
} from '../actions/types';

const initialState = [];

function cartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ITEM_ADD:
      return [...state, { ...payload, quantity: payload.quantity + 1 }];
    case CART_ITEM_INCREASE:
      return state.map((item) =>
        item._id === payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case CART_ITEM_DECREASE:
      return state.map((item) =>
        item._id === payload._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case CART_ITEM_REMOVE:
      return state.filter((item) => item._id !== payload._id);
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

export default cartReducer;
