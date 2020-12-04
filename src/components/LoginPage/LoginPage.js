import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    let toRegister = () => {
      this.props.history.push('/registration');
    };
    return (
      <center>
        <center>
          <LoginForm callback={toRegister} />
        </center>
      </center>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
