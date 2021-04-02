import {
  CART_ITEM_ADD,
  CART_ITEM_INCREASE,
  CART_ITEM_DECREASE,
  CART_ITEM_REMOVE,
  CLEAR_CART,
} from './types';

export const handleCart = (pizz = [], call = '') => (dispatch) => {
  switch (call) {
    case 'add': {
      dispatch({
        type: CART_ITEM_ADD,
        payload: pizz,
      });
      break;
    }
    case 'remove': {
      dispatch({
        type: CART_ITEM_REMOVE,
        payload: pizz,
      });
      break;
    }
    case 'increase': {
      dispatch({
        type: CART_ITEM_INCREASE,
        payload: pizz,
      });
      break;
    }
    case 'decrease': {
      dispatch({
        type: CART_ITEM_DECREASE,
        payload: pizz,
      });
      break;
    }
    case 'delete': {
      dispatch({
        type: CLEAR_CART,
      });
      break;
    }
    default:
      dispatch({
        type: CLEAR_CART,
      });
  }
};
