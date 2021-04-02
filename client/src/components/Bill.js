import React, { Fragment } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import formatDate from '../utils/formatDate';

import PropTypes from 'prop-types';

const Bill = ({ order }) => {
  return (
    <div>
      <h1 className='large ' style={{ color: '#f02d13' }}>
        Bill
      </h1>
      {order && order.pizzas && order.pizzas.length > 0 ? (
        <Fragment>
          {order.pizzas.map((piz) => (
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
            </Card>
            <Card className='cart-card'>
              <Row>
                <Col>
                  <CardTitle tag='h5'>
                    Order date & time: {formatDate(order.date)}
                  </CardTitle>
                </Col>
              </Row>
            </Card>
          </Row>
        </Fragment>
      ) : (
        <div>
          <h1 className='large'>No bill available</h1>
        </div>
      )}
    </div>
  );
};

Bill.propTypes = {
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order.order,
});

export default connect(mapStateToProps)(Bill);
