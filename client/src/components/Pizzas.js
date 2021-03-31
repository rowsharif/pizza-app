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
import PropTypes from 'prop-types';

const Pizzas = ({ pizzas, getPizzas }) => {
  const [newPizz, setNewPizz] = useState([]);

  useEffect(() => {
    getPizzas();
    setNewPizz(pizzas.map((p) => ({ ...p, num: 0 })));
  }, []);

  const handleRemove = (p) => {
    if (p.num > 0) {
      let temp = newPizz.map((item) =>
        item._id === p._id ? { ...item, num: item.num - 1 } : item
      );
      setNewPizz(temp);
    }
  };

  const handleAdd = (p) => {
    if (p.num < 20) {
      let temp = newPizz.map((item) =>
        item._id === p._id ? { ...item, num: item.num + 1 } : item
      );
      setNewPizz(temp);
    }
  };

  return (
    <div>
      <Row>
        {newPizz &&
          newPizz.length > 0 &&
          newPizz.map((piz) => (
            <Col sm='4'>
              <Card className='landing-card'>
                <CardBody>
                  <CardTitle tag='h5'>{piz.name}</CardTitle>
                  <CardImg
                    top
                    src={require(`../img/${piz.name}.jpeg`)}
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
                      <Input value={piz.num} />
                    </Col>
                    <Col sm='4'>
                      <Button onClick={() => handleAdd(piz)}>+</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

Pizzas.propTypes = {
  getPizzas: PropTypes.func.isRequired,
  pizzas: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  pizzas: state.pizza.pizzas,
});

export default connect(mapStateToProps, { getPizzas })(Pizzas);
