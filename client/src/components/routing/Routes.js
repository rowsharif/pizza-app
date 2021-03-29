import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';

import HistoryComp from '../HistoryComp';
import Bill from '../Bill';
import OrderForm from '../OrderForm.js';
import Cart from '../Cart';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/orderForm' component={OrderForm} />
        <Route exact path='/bill' component={Bill} />
        <PrivateRoute exact path='/history' component={HistoryComp} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
