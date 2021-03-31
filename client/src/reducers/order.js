import {
  GET_ORDERS,
  ORDER_ERROR,
  CLEAR_ORDER,
  CREATE_ORDER,
} from '../actions/types';

const initialState = {
  orders: [],
  order: {},
  loading: true,
  error: {},
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        order: null,
      };
    case CLEAR_ORDER:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
}

export default orderReducer;
