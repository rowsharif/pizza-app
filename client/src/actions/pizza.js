import api from '../utils/api';
import { GET_PIZZAS, PIZZA_ERROR } from './types';

// Get pizzas
export const getPizzas = () => async (dispatch) => {
  try {
    const res = await api.get('/pizzas');

    dispatch({
      type: GET_PIZZAS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PIZZA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
