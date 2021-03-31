import { GET_PIZZAS, PIZZA_ERROR } from '../actions/types';

const initialState = {
  pizzas: [],
  loading: true,
  error: {},
};

function pizzaReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PIZZAS:
      return {
        ...state,
        pizzas: payload,
        loading: false,
      };

    case PIZZA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default pizzaReducer;
