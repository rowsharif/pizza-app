import React from 'react';
import { Link } from 'react-router-dom';
import Pizzas from '../Pizzas';

const Landing = () => {
  return (
    <div className='dark-overlay'>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='large'>BestPizza Menu</h1>
            <p className='lead'></p>
            <div className='buttons'></div>
            <Pizzas />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
