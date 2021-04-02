import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { createOrder } from '../actions/order';

import PropTypes from 'prop-types';

const OrderForm = ({ cartPizzas, auth, history, createOrder }) => {
  const [deliveryCost, setDeliveryCost] = useState(16);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartPizzas &&
      cartPizzas.length > 0 &&
      cartPizzas.map((item) => (temp = item.quantity * item.price + temp));
    setTotal(temp + deliveryCost);
  }, [cartPizzas]);

  const [formData, setFormData] = useState({
    firstName: auth.isAuthenticated ? auth.user.firstName : '',
    lastName: auth.isAuthenticated ? auth.user.lastName : '',
    phone: auth.isAuthenticated ? auth.user.phone : '',
    street: auth.isAuthenticated ? auth.user.address.street : '',
    house: auth.isAuthenticated ? auth.user.address.house : '',
    area: auth.isAuthenticated ? auth.user.address.area : '',
    email: auth.isAuthenticated ? auth.user.email : '',
  });

  const { firstName, lastName, phone, street, house, area, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    createOrder(
      {
        pizzas: cartPizzas,
        total,
        deliveryCost,
        firstName,
        lastName,
        phone,
        address: {
          street,
          house,
          area,
        },
        email,
      },
      history
    );
  };

  return (
    <div>
      <h1 className='large ' style={{ color: '#f02d13' }}>
        Checkout
      </h1>
      {cartPizzas && cartPizzas.length > 0 ? (
        <Fragment>
          {cartPizzas.map((piz) => (
            <Row key={piz._id}>
              <Card className='cart-card'>
                <CardBody>
                  <Row style={{ justifyContent: 'center' }}>
                    <Col sm='6'>
                      <CardTitle tag='h5'>{piz.name}</CardTitle>
                    </Col>
                    <Col sm='2'>
                      <CardTitle tag='h5'>({piz.quantity})</CardTitle>
                    </Col>
                    <Col sm='4'>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>
                        {piz.price * piz.quantity} USD /{' '}
                        {Math.round(piz.price * piz.quantity * 0.85 * 100) /
                          100}{' '}
                        EUR
                      </CardSubtitle>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          ))}
          <Row>
            <Card className='cart-card'>
              <Row>
                <Col>
                  <CardTitle tag='h5'>Delivery cost:</CardTitle>
                </Col>
                <Col>
                  <CardTitle tag='h6'>
                    {deliveryCost} USD / {deliveryCost * 0.85} EUR
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardTitle tag='h5'>Total:</CardTitle>
                </Col>
                <Col>
                  <CardTitle tag='h6'>
                    {total} USD / {Math.round(total * 0.85 * 100) / 100} EUR
                  </CardTitle>
                </Col>
              </Row>
            </Card>
          </Row>
        </Fragment>
      ) : (
        <div>
          <h1 className='large'>Cart is Empty</h1>
        </div>
      )}

      <Fragment>
        <p className='lead'>
          <i className='fas fa-user' /> Your Information
        </p>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='First name'
              name='firstName'
              value={firstName}
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              value={phone}
              onChange={onChange}
            />
          </div>
          <p className='my-1'>Address</p>
          <div
            className='form-group'
            style={{ display: 'inline', marginRight: '2%' }}
          >
            <input
              type='number'
              placeholder='Street number'
              name='street'
              value={street}
              onChange={onChange}
            />
          </div>
          <div
            className='form-group'
            style={{ display: 'inline', marginRight: '2%' }}
          >
            <input
              type='number'
              placeholder='House number'
              name='house'
              value={house}
              onChange={onChange}
            />
          </div>
          <div className='form-group ' style={{ display: 'inline' }}>
            <input
              type='number'
              placeholder='Area number'
              name='area'
              value={area}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Confirm order'
            disabled={cartPizzas.length === 0}
          />
        </form>
      </Fragment>
    </div>
  );
};

OrderForm.propTypes = {
  cartPizzas: PropTypes.array.isRequired,
  handleCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cartPizzas: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { createOrder })(OrderForm);
