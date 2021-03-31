import api from '../utils/api';
import { setAlert } from './alert';

import { GET_ORDER, GET_ORDERS, ORDER_ERROR, CLEAR_ORDER } from './types';

// Get current users order
export const getUsersOrders = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDER });

  try {
    const res = await api.get('/orders/');

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update order
export const createOrder = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post('/orders', formData);

    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });

    dispatch(setAlert('Order Created', 'success'));

    history.push('/bill');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
