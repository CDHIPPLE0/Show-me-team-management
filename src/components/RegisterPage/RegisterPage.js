import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
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
        {!this.props.store.user.id ? <Nav /> : <></>}
        <RegisterForm callback={toLogin} />
      </center>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
