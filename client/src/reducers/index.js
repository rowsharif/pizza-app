import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import order from './order';
import pizza from './pizza';
import cart from './cart';

export default combineReducers({
  alert,
  auth,
  order,
  pizza,
  cart,
});
