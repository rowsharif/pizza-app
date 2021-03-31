import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    house: '',
    area: '',
    email: '',
    password: '',
    password2: '',
  });

  const {
    firstName,
    lastName,
    phone,
    street,
    house,
    area,
    email,
    password,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        firstName,
        lastName,
        phone,
        address: {
          street,
          house,
          area,
        },
        email,
        password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h1 className='large ' style={{ color: '#f02d13' }}>
        Sign Up
      </h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
