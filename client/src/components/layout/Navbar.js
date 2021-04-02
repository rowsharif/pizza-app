import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'reactstrap';

const Navbar = ({ auth: { isAuthenticated }, logout, cartPizzas }) => {
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    let total = 0;
    cartPizzas &&
      cartPizzas.length > 0 &&
      cartPizzas.map((item) => (total = item.quantity + total));
    setCartItems(total);
  }, [cartPizzas]);

  const authLinks = (
    <ul>
      <li>
        <Link to='/history'>Orders History</Link>
      </li>
      <li>
        <Link to='/cart'>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size='2x'
            style={{ position: 'absolute' }}
          />
          <Badge
            variant='light'
            style={{ position: 'relative', size: '1x', marginLeft: '14px' }}
          >
            {cartItems}
          </Badge>
        </Link>
      </li>

      <li>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/cart'>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size='2x'
            style={{ position: 'absolute' }}
          />
          <Badge
            variant='light'
            style={{ position: 'relative', size: '1x', marginLeft: '14px' }}
          >
            {cartItems}
          </Badge>
        </Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> BestPizza{' '}
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cartPizzas: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartPizzas: state.cart,
});

export default connect(mapStateToProps, { logout })(Navbar);
