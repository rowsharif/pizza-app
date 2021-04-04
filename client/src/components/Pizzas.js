import React, { useEffect, useState } from 'react';
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
import { connect } from 'react-redux';
import { getPizzas } from '../actions/pizza';
import { handleCart } from '../actions/cart';

import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';

const Pizzas = ({ pizzas, getPizzas, cartPizzas, handleCart }) => {
  const [newPizz, setNewPizz] = useState([]);

  useEffect(() => {
    (pizzas === null || pizzas.length) === 0 && getPizzas();
    console.log('got the pizzas', newPizz);
  }, []);

  useEffect(() => {
    let tempPizzas = pizzas.map((p) => ({ ...p, quantity: 0 }));
    if (cartPizzas && cartPizzas.length > 0) {
      let temp = tempPizzas.map((p) => {
        let items = cartPizzas.filter((cp) => cp._id === p._id);
        if (items.length > 0) {
          return items[0];
        } else return p;
      });
      console.log('newp', temp);
      setNewPizz(temp);
    } else {
      setNewPizz(tempPizzas);
    }
  }, [cartPizzas, pizzas]);

  const handleRemove = (p) => {
    if (p.quantity === 1) {
      handleCart(p, 'remove');
    } else if (p.quantity > 0) {
      handleCart(p, 'decrease');
    }
  };

  const handleAdd = (p) => {
    if (p.quantity === 0) {
      handleCart(p, 'add');
    } else {
      handleCart(p, 'increase');
    }
  };

  return (
    <div>
      <Row>
        {newPizz && newPizz.length > 0 ? (
          newPizz.map((piz) => (
            <Col sm='4' key={piz._id}>
              <Card className='landing-card'>
                <CardBody>
                  <CardTitle tag='h5'>{piz.name}</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    {piz.price} USD / {Math.round(piz.price * 0.85 * 100) / 100}{' '}
                    EUR
                  </CardSubtitle>
                  <CardImg
                    top
                    className='landing-CardImg'
                    src={require(`../img/${piz.name}.jpeg`).default}
                    alt={piz.name}
                  />
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    {piz.description}
                  </CardSubtitle>
                  <Row>
                    <Col sm='4'>
                      <Button onClick={() => handleRemove(piz)}>-</Button>
                    </Col>
                    <Col sm='4'>
                      <Input value={piz.quantity} readOnly />
                    </Col>
                    <Col sm='4'>
                      <Button onClick={() => handleAdd(piz)}>+</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <Spinner />
        )}
      </Row>
    </div>
  );
};

Pizzas.propTypes = {
  getPizzas: PropTypes.func.isRequired,
  pizzas: PropTypes.array.isRequired,
  cartPizzas: PropTypes.array.isRequired,
  handleCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pizzas: state.pizza.pizzas,
  cartPizzas: state.cart,
});

export default connect(mapStateToProps, { getPizzas, handleCart })(Pizzas);
