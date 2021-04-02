import React, { Fragment, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { getUsersOrders } from '../actions/order';
import formatDate from '../utils/formatDate';
import Spinner from './layout/Spinner';

import PropTypes from 'prop-types';

const HistoryComp = ({ order: { orders, loading }, getUsersOrders }) => {
  useEffect(() => {
    getUsersOrders();
  }, []);

  return (
    <div>
      <h1 className='large ' style={{ color: '#f02d13' }}>
        Previous orders' bills
      </h1>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <Fragment>
            <Card className='cart-card'>
              {order.pizzas.map((piz) => (
                <Row key={piz._id}>
                  <CardBody>
                    {' '}
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
                </Row>
              ))}
              <Row>
                <Col>
                  <CardTitle tag='h5'>Delivery cost:</CardTitle>
                </Col>
                <Col>
                  <CardTitle tag='h6'>
                    {order.deliveryCost} USD / {order.deliveryCost * 0.85} EUR
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardTitle tag='h5'>Total:</CardTitle>
                </Col>
                <Col>
                  <CardTitle tag='h6'>
                    {order.total} USD /{' '}
                    {Math.round(order.total * 0.85 * 100) / 100} EUR
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    order date & time: {formatDate(order.date)}
                  </CardSubtitle>
                </Col>
              </Row>
            </Card>
          </Fragment>
        ))
      ) : loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className='large'>No History available</h1>
        </div>
      )}
    </div>
  );
};

HistoryComp.propTypes = {
  order: PropTypes.object.isRequired,
  getUsersOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { getUsersOrders })(HistoryComp);
