import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {
  render() {
    let toRegister = () => {
      this.props.history.push('/registration');
    };
    return (
      <center className="loginPage">
        {!this.props.store.user.id ? <Nav /> : <></>}
        <center>
          <LoginForm callback={toRegister} />
        </center>
      </center>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
