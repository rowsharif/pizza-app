import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
  Row,
  Col,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleCart } from '../actions/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

const Cart = ({ cartPizzas, handleCart }) => {
  const [deliveryCost, setDeliveryCost] = useState(16);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartPizzas &&
      cartPizzas.length > 0 &&
      cartPizzas.map((item) => (temp = item.quantity * item.price + temp));
    setTotal(temp + deliveryCost);
  }, [cartPizzas]);

  const handleRemove = (p, call = 'decrease') => {
    if (p.quantity === 1 || call === 'remove') {
      handleCart(p, 'remove');
    } else if (p.quantity > 0) {
      handleCart(p, 'decrease');
    }
  };

  const handleAdd = (p) => {
    handleCart(p, 'increase');
  };
  return (
    <div>
      <h1 className='large ' style={{ color: '#f02d13' }}>
        Cart
      </h1>
      {cartPizzas && cartPizzas.length > 0 ? (
        <Fragment>
          {cartPizzas.map((piz) => (
            <Row key={piz._id}>
              <Card className='cart-card'>
                <CardBody>
                  <Row>
                    <Col sm='4'>
                      <CardImg
                        top
                        className='landing-cart-CardImg '
                        src={require(`../img/${piz.name}.jpeg`).default}
                        alt={piz.name}
                      />
                    </Col>
                    <Col sm='8'>
                      {' '}
                      <Row style={{ justifyContent: 'center' }}>
                        <Col sm='8'>
                          <CardTitle tag='h5'>{piz.name}</CardTitle>
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
                      <Row>
                        <Col sm='3'>
                          <Button onClick={() => handleRemove(piz)}>-</Button>
                        </Col>
                        <Col sm='3'>
                          <Input value={piz.quantity} readOnly />
                        </Col>
                        <Col sm='3'>
                          <Button onClick={() => handleAdd(piz)}>+</Button>
                        </Col>
                        <Col sm='3'>
                          <FontAwesomeIcon
                            onClick={() => handleRemove(piz, 'remove')}
                            icon={faTimesCircle}
                            size='2x'
                            color='#a3a3a3'
                            style={{ position: 'absolute' }}
                          />
                        </Col>
                      </Row>
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

          <Link className='btn btn-primary' to='/order'>
            Continue checkout
          </Link>
          <Link to='/' className='btn btn-light'>
            Go back to Menu
          </Link>
        </Fragment>
      ) : (
        <div>
          <h1 className='large'>Cart is Empty</h1>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartPizzas: PropTypes.array.isRequired,
  handleCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartPizzas: state.cart,
});

export default connect(mapStateToProps, { handleCart })(Cart);
