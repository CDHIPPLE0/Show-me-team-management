import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    let toLogin = () => {
      this.props.history.push('/login');
    };
    return (
      <center className="loginPage">
        <RegisterForm callback={toLogin} />
      </center>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
